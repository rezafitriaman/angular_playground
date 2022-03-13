import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { InactiveTodo, Todo } from '../models/Todo';

@Component({
    selector: 'app-in-active-todo',
    templateUrl: './inactive-todo.component.html',
    styleUrls: ['./inactive-todo.component.css'],
})
export class InactiveTodoComponent implements OnInit {
    public todos: Array<InactiveTodo> = [];

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.todos = this.todoService.getInActiveTodos();
        this.todoService.updateInActiveTodo.subscribe((inActiveTodos) => {
            this.todos = inActiveTodos;
        });
    }

    onSetToActive(index: string) {
        this.todoService.onSetToActive(index);
    }
}
