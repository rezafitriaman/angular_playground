import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';

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
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.todoService.setTodos(data['todos']);
        });
        
        // it load via a resolver : example - 152
        this.subscription = this.todoService.isLoadingTodo.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}