import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { InactiveTodo, Todo } from '../models/Todo';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-in-active-todo',
    templateUrl: './inactive-todo.component.html',
    styleUrls: ['./inactive-todo.component.css'],
})
export class InactiveTodoComponent implements OnInit {
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
        console.log('this.todos--->', this.todos);
        this.todoService.updateInActiveTodo.subscribe((inActiveTodos) => {
            this.todos = inActiveTodos;
        });
    }

     onSetToActive(labelId: string | undefined, todoId: string | undefined) {
        if (!labelId || !todoId) return;

        this.subscriptionSetToActive = this.dataStorage.deleteInActiveTodo(todoId)
        .subscribe((payload: null) => {
            if (!payload) {
                console.log('deleted from firebase inActiveTodo');
                this.todoService.onSetToActive(labelId, todoId);

                let activeTodo = this.todoService.getActiveTodos();
                let activeTodoObj = this.arrayToObject(activeTodo, target =>  (target.name) ? target.name : '');

                this.dataStorage.setToActive(activeTodoObj, labelId).subscribe(payload => {
                    console.log('arg---->', payload);

                    //TODO create an info or redo function
                })

            }
        })
    }
}
