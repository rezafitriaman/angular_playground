import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { of, Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';

// This is the header - list of todo header
@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit, OnDestroy {
    public todos: Array<ActiveTodo> = [];
    public isNewTodo: boolean = false;
    public subscription: Subscription | undefined;
    public subscriptionDelete: Subscription | undefined;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.todos = this.todoService.getActiveTodos();
        this.subscription = this.todoService.activeTodosAdd.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
            this.isNewTodo = true;

            of(null).pipe(
                take(1),
                delay(4000)
            ).subscribe(value => {
                if(!value){
                    this.isNewTodo = false;
                }
            })
        });

        this.subscriptionDelete = this.todoService.activeTodoDelete.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.subscriptionDelete?.unsubscribe();
    }
}
