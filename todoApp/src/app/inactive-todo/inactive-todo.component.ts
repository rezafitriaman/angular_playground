import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActiveTodo, InactiveTodo, Todo, Todos } from '../models/Todo';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-in-active-todo',
    templateUrl: './inactive-todo.component.html',
    styleUrls: ['./inactive-todo.component.css'],
})
export class InactiveTodoComponent implements OnInit, OnDestroy {
    public todos: Array<InactiveTodo> = [];
    public subscriptionSetToActive: Subscription = new Observable().subscribe();
    // reference https://stackoverflow.com/questions/4215737/convert-array-to-object
    private arrayToObject = <T extends Record<K, any>, K extends keyof any>(array: T[] = [], getKey: (item: T) => K) => array.reduce((obj, cur) => {
        const key = getKey(cur)
        return ({...obj, [key]: cur})
      }, {} as Record<K, T>)

    constructor(
        private todoService: TodoService,
        private dataStorage: DataStorageService
    ) {}

    ngOnInit(): void {
        this.todos = this.todoService.getInActiveTodos();
        this.todoService.updateInActiveTodo.subscribe((inActiveTodos) => {
            this.todos = inActiveTodos;
        });
    }

     onSetToActive(labelId: string | undefined, todoId: string | undefined) {
        if (!labelId || !todoId) return;

        this.subscriptionSetToActive = this.dataStorage.deleteInActiveTodo(todoId)
        .subscribe((payload: null) => {
            if (!payload) {
                this.todoService.onSetToActive(labelId, todoId);
                
                let activeTodos = this.todoService.getActiveTodos();

                //convert todo array to a todo object - fire base need an Object
                let activeTodoObj = this.arrayToObject(activeTodos, target =>  (target.name) ? target.name : '');
                
                //convert todo array to a todo object - fire base need an Object
                for (const key of Object.keys(activeTodoObj)) {
                    if(activeTodoObj[key].items) {
                        (activeTodoObj[key].items as unknown) = this.arrayToObject(activeTodoObj[key].items, target => (target.id) ? target.id : '') as {[key:string]: Todo};
                    }
                }

                this.dataStorage.setToActive(activeTodoObj).subscribe(payload => {
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
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.subscriptionSetToActive.unsubscribe();
    }
}