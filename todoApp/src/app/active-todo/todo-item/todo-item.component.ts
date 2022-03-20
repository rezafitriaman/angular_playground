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
import { ActivatedRoute, Data, Params, UrlTree } from '@angular/router';
import { ActiveTodo, Todo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { of, Observable, Subscription } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit, AfterViewInit, CanComponentDeactivate, OnDestroy {
    public inputFillUp: boolean | null | undefined = false;
    public id: string = '';
    public todos: Todo[] = [];
    public newItem: string = '';
    public placeHolder: string = '';
    public loading: boolean = false;
    public subscription: Subscription = new Observable().subscribe();
    public subscriptionLoading: Subscription = new Observable().subscribe();
    public subscriptionEditable: Subscription = new Observable().subscribe();
    public window: Window | null = this.document.defaultView;
    @ViewChildren('contentTodo') contentTodoRef: QueryList<ElementRef> | undefined;

    constructor(
        private route: ActivatedRoute,
        private todoService: TodoService,
        private dataStorage: DataStorageService,
        private renderer: Renderer2,
        private ref: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        console.log('todo item component');
        // it load via a resolver : example - 152
        this.route.data.subscribe((data: Data) => {
            console.log('todo item resolver', data);
            this.todos = data['activeTodoItem']; // the name: activeTodoItem - it is a custom name from route module
        });

        //it load via a normal route
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.todos = this.todoService.getActiveTodoItem(this.id);
        });

        this.subscription = this.todoService.activeTodosItemAdd.subscribe( (todos: Array<Todo>) => {
            console.log('on list todo component------', todos);
            this.todos = todos

        });

        this.subscriptionLoading = this.todoService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    ngAfterViewInit() {
        //console.log(this.contentTodoRef);
    }

    onInputFillUp(inputFillUp: boolean | null | undefined) {
        this.inputFillUp = inputFillUp;
    }

    onAddNewTodoItem(newItem: string) {
        if (newItem === '') return;
        this.newItem = newItem;
        this.dataStorage.postTodo(new Todo(newItem, false, false), this.id).subscribe(todo =>{
            console.log(todo);
            this.todoService.addTodoItem(new Todo(newItem, false, false, todo.name), this.id);
        })


        this.inputFillUp = false;
    }

    onSetToComplete(indexItem: number) {
        if (this.todos[indexItem].editable) return;
        this.todoService.onSetToComplete(indexItem, this.id);
    }

    onSetToInactive(indexItem: number) {
        this.todoService.onSetToInactive(indexItem, this.id);
    }

    onSetToEditable(indexItem: number) {
        let contentText = this.contentTodoRef?.toArray()[indexItem].nativeElement.innerText;
        this.subscriptionEditable = this.todoService
            .onSetToEditable(indexItem, this.id, contentText)
            .pipe(delay(10))
            .subscribe((data: boolean) => {
                if (data) this.setCaret(indexItem);
            });
    }

    onEnterDown(event: KeyboardEvent, indexItem: number) {
        const enterKey = event.key === 'Enter';

        if (enterKey) this.onSetToEditable(indexItem);
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

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.inputFillUp) {
            if (!confirm('Do you want to discard the changes?')) return false;

            this.todoService.resetPlaceHolder.next('');
            this.inputFillUp = false;
            return true;
        } else {
            return true;
        }
    }

    ngOnDestroy() {
        this.subscriptionLoading.unsubscribe();
        this.subscriptionEditable.unsubscribe();
    }
}
