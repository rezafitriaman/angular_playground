import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Data, Router, UrlTree } from '@angular/router';
import { InactiveTodo, Todo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { of, Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { AccountService } from 'src/app/account/account.service';
import { delay, take } from 'rxjs/operators';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit, AfterViewInit, CanComponentDeactivate, OnDestroy {
    public inputFillUp: boolean | null | undefined = false;
    public id: string = '';
    public todos: Todo[] = [];
    public todoList: string | undefined = '';
    public newItem: string = '';
    public placeHolder: string = '';
    public loading: boolean = false;
    public subscription: Subscription | undefined;
    public subscriptionLoading: Subscription | undefined;
    public subscriptionEditable: Subscription | undefined;
    public subscriptionCompleted: Subscription | undefined;
    public subscriptionSetToInactive: Subscription | undefined;
    public subscriptionDeleteTodoList: Subscription | undefined;
    public window: Window | null = this.document.defaultView;
    @ViewChildren('contentTodo') contentTodoRef: QueryList<ElementRef> | undefined;
    // reference https://stackoverflow.com/questions/4215737/convert-array-to-object
    private arrayToObject = <T extends Record<K, any>, K extends keyof any>(array: T[] = [], getKey: (item: T) => K) => array.reduce((obj, cur) => {
        const key = getKey(cur)
        return ({...obj, [key]: cur})
      }, {} as Record<K, T>)
    
    constructor(
        private route: ActivatedRoute,
        private todoService: TodoService,
        private dataStorage: DataStorageService,
        private renderer: Renderer2,
        private ref: ElementRef,
        private accountService: AccountService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        console.log('todo item component');
        // it load via a resolver : example - 152
        this.route.data.subscribe((data: Data) => {
            console.log('todo item resolver', data['activeTodoItem']);
            this.id = data['activeTodoItem'].name;
            this.todos = data['activeTodoItem'].items; // the name: activeTodoItem - it is a custom name from route module
            this.todoList = data['activeTodoItem'].label;
        });

        //it load via a normal route
        // this.route.params.subscribe((params: Params) => {
        //     this.id = params['id'];
        //     const activeTodo = this.todoService.getActiveTodo(this.id);
        //     console.log('activeTodo',activeTodo);
        //     this.todoList = activeTodo ? activeTodo.label : '';
        //     this.todos = activeTodo ? activeTodo.items : [];
        // });

        this.subscription = this.todoService.activeTodosItemUpdate.subscribe( (todos: Array<Todo>) => {
            this.todos = todos;
        });

        this.subscriptionLoading = this.todoService.isLoadingTodo.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    ngAfterViewInit() {
        console.log(this.contentTodoRef);
    }

    onInputFillUp(inputFillUp: boolean | null | undefined) {
        this.inputFillUp = inputFillUp;
    }

    onAddNewTodoItem(newItem: string | null) {
        if (newItem === '' || newItem === null) return;

        this.newItem = newItem;

        this.dataStorage.postTodoItem(new Todo(newItem, false, false), this.id).subscribe((payload: unknown ) =>{            
            this.todoService.addTodoItem(new Todo(newItem, false, false, (payload as {name: string}).name), this.id);
        })

        this.inputFillUp = false;
    }

    onSetToComplete(itemId: string | undefined) {
        if (!itemId) return;

        let targetItemId = this.todos.find(todo => {
            return todo.id === itemId
        })
        let isCompleted = targetItemId?.completed ? false : true;

        this.subscriptionCompleted = this.dataStorage.updateTodoOnComplete(this.id, itemId, isCompleted).subscribe(
            (payload: { completed: boolean }) => {
                this.todoService.onSetToComplete(this.id, itemId, payload.completed);
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
            }
        );
    }

    onSetToInactive(itemId: string | undefined) {
        if (!itemId) return;

        this.subscriptionSetToInactive = this.dataStorage.deleteActiveTodo(this.id, itemId).subscribe(
            (payload: null) => {
                if(!payload) {
                    this.todoService.onSetToInactive(this.id, itemId);
                    let inActiveTodo = this.todoService.getInActiveTodos();

                    //convert todo array to a todo object - fire base need an Object              
                    let inActiveTodoObj = this.arrayToObject(inActiveTodo, target =>  (target.todo.id) ? target.todo.id : '');
                    
                    this.dataStorage.setTodoListOnFireBase(inActiveTodoObj, 'inActiveTodos', 'patch').subscribe(
                        payload => {
                            let inActiveTodos: Array<InactiveTodo> = [];                              
                            const inActiveTodosList = Object.values(payload) as Array<InactiveTodo>;
                        
                            Object.entries(inActiveTodosList).forEach((val: [string, InactiveTodo]) => {
                                inActiveTodos.push(new InactiveTodo(val[1].label, val[1].todo, val[1].name));
                            });
                            
                            this.todoService.setInActiveTodo(inActiveTodos);
                            //TODO create an info and redo function
                    },
                    errorMessage => {
                        this.accountService.thereIsError.next(errorMessage);
                    })
                }
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
            }
        );
    }

    onSetToEditable(indexItem: number, itemId: string | undefined) {
        if (!itemId) return;
        let contentText = this.contentTodoRef?.toArray()[indexItem].nativeElement.innerText;
        this.subscriptionEditable = this.dataStorage.updateTodoContent(this.id, itemId, contentText).subscribe(
            (payrol: { content: string }) => {
                const editable: boolean = this.todoService.onSetToEditable(this.id, itemId, payrol.content);
                
                of(editable).pipe(
                    take(1),
                    delay(100)
                ).subscribe(value => {
                    if(value) {
                        this.setCaret(indexItem);
                    }                    
                });
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
            }
        );
    }

    onEnterDown(event: KeyboardEvent, indexItem: number, itemId: string | undefined) {        
        const enterKey = event.key === 'Enter';
    
        if (enterKey) {
            event.preventDefault(); 
            this.onSetToEditable(indexItem, itemId);
        }
    }

    setCaret(indexItem: number) {
        // example http://jsfiddle.net/timdown/vXnCM/
        let el = this.contentTodoRef?.toArray()[indexItem].nativeElement;
        const range = this.document.createRange();
        const sel = this.window?.getSelection()!;
        range.setStart(el as Node, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
    }

    canDeactivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.inputFillUp) {
            if (!confirm('Do you want to discard the changes?')) return false;

            this.todoService.resetPlaceHolder.next('');
            this.inputFillUp = false;

            return true;
        } else {
            return true;
        }
    }

    deleteItem() {
        //TODO add yes or no dialog please !
        this.subscriptionDeleteTodoList = this.dataStorage.deleteTodoList(this.id).subscribe(
            (payrol: null) => {
                if(!payrol) {
                    this.todoService.deleteActiveTodo(this.id);
                    this.router.navigate(['/activeTodo']);
                }
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
            }    
        )
    }

    ngOnDestroy() {
        this.subscriptionLoading?.unsubscribe();
        this.subscriptionEditable?.unsubscribe();
        this.subscriptionCompleted?.unsubscribe();
        this.subscriptionSetToInactive?.unsubscribe();
        this.subscriptionDeleteTodoList?.unsubscribe();
    }
}