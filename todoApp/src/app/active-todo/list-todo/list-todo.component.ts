import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { ActivatedRoute, NavigationEnd, Params, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit, OnDestroy {
    public todos: Array<ActiveTodo> = [];
    public newItem: boolean = false;
    public subscription: Subscription = new Observable().subscribe();

    constructor(
        private todoService: TodoService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const urlTarget =
            this.todoService.todos.activeTodos.length > 0 ? '/activeTodo/0' : '/activeTodo';

        this.router.navigate([urlTarget]);
        this.todos = this.todoService.getActiveTodos();
        this.todoService.activeTodosAdd.subscribe((todos: Array<ActiveTodo>) => {
            this.todos = todos;
            this.newItem = true;

            setTimeout(() => {
                this.newItem = false;
            }, 4000);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
