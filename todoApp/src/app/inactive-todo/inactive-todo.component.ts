import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActiveTodo, InactiveTodo, Todo, Todos } from '../models/Todo';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'app-in-active-todo',
    templateUrl: './inactive-todo.component.html',
    styleUrls: ['./inactive-todo.component.css'],
})
export class InactiveTodoComponent implements OnInit, OnDestroy {
    public todos: Array<InactiveTodo> = [];
    public subscriptionSetToActive: Subscription | undefined;
    public subriptionSetTodoListOnFireBase: Subscription | undefined;
    // reference https://stackoverflow.com/questions/4215737/convert-array-to-object
    private arrayToObject = <T extends Record<K, any>, K extends keyof any>(array: T[] = [], getKey: (item: T) => K) => array.reduce((obj, cur) => {
        const key = getKey(cur)
        return ({...obj, [key]: cur})
      }, {} as Record<K, T>)

    constructor(
        private todoService: TodoService,
        private dataStorage: DataStorageService,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.todos = this.todoService.getInActiveTodos();
        this.todoService.updateInActiveTodo.subscribe((inActiveTodos) => {
            this.todos = inActiveTodos;
        });
    }

     onSetToActive(inActiveId: string | undefined, todoId: string | undefined, inActiveLabel: string) {
        // hij moet labelId of todoId hebben
        if (!inActiveId || !todoId) return;
        // probeer item te deleten vanuit inActive tabel op firebase
        this.subscriptionSetToActive = this.dataStorage.deleteInActiveTodo(todoId).subscribe(
            (payload: null) => {
                if (!payload) {
                    // set de item to active if the item allready deleted from firebase
                    this.todoService.onSetToActive(inActiveId, todoId, inActiveLabel);
                    // get all active todos
                    let activeTodos = this.todoService.getActiveTodos();
                    console.log('get active todos', activeTodos);
                    //convert todo array to a todo object - fire base need an Object
                    let activeTodoObj = this.arrayToObject(activeTodos, target =>  (target.name) ? target.name : '');
                    
                    //convert todo array to a todo object - fire base need an Object
                    for (const key of Object.keys(activeTodoObj)) {
                        if(activeTodoObj[key].items) {
                            (activeTodoObj[key].items as unknown) = this.arrayToObject(activeTodoObj[key].items, target => (target.id) ? target.id : '') as {[key:string]: Todo};
                        }
                    }

                    // if deleted set de todo obj to active todo-section
                    this.subriptionSetTodoListOnFireBase = this.dataStorage.setTodoListOnFireBase(activeTodoObj, 'activeTodos', 'patch').subscribe(
                        payload => {
                            let activeTodos: Array<ActiveTodo> = [];                            
                            const activeTodosList = Object.values(payload) as Array<ActiveTodo>;

                            Object.entries(activeTodosList).forEach((val: [string, ActiveTodo]) => {
                                const activeTodo = {
                                    get name() {
                                        return val[1].name; 
                                    },
                                    get label() {
                                        return val[1].label;
                                    },
                                    get items() {
                                        const target: Array<Todo> = [];
                                        
                                        if(val[1].items) {
                                            const targetItems = Object.entries(val[1].items);
                    
                                            targetItems.forEach((val: [string, Todo]) => {
                                                const name = val[0];
                                                const content = val[1].content;
                                                const completed = val[1].completed;
                                                const editable = val[1].editable;

                                                target.push(new Todo(content, completed, editable, name));
                                            })
                                        }
            
                                        return target;
                                    }
                                }

                                activeTodos.push(new ActiveTodo(activeTodo.label, activeTodo.items, activeTodo.name));
                            })
                
                            this.todoService.setActiveTodo(activeTodos);
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
        )
    }

    ngOnDestroy(): void {
        this.subscriptionSetToActive?.unsubscribe();
        this.subriptionSetTodoListOnFireBase?.unsubscribe();
    }
}