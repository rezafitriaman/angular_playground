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

     onSetToActive(itemId: string | undefined) {
    //     this.subscriptionSetToActive = this.dataStorage.deleteInActiveTodo(itemId)
    //     .subscribe((payload: null) => {
    //         if (!payload) {
    //             // finish this please
    //         }
    //     })

         this.todoService.onSetToActive('');
    }
}
