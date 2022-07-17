import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-active-todo',
    templateUrl: './active-todo.component.html',
    styleUrls: ['./active-todo.component.css'],
})
export class ActiveTodoComponent implements OnInit, OnDestroy {
    public loading: boolean = false;
    public subscription: Subscription | undefined;

    constructor(
        private todoService: TodoService, 
    ) {}

    ngOnInit(): void {
        this.subscription = this.todoService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}