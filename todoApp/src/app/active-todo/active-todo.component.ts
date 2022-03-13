import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../shared/storage/data-storage.service';

@Component({
    selector: 'app-active-todo',
    templateUrl: './active-todo.component.html',
    styleUrls: ['./active-todo.component.css'],
})
export class ActiveTodoComponent implements OnInit, OnDestroy {
    public loading: boolean = false;
    public subscription: Subscription = new Observable().subscribe();

    constructor(
        private todoService: TodoService, 
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void {
        this.subscription = this.todoService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
