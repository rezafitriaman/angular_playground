import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../models/Todo";

@Component({
  selector: 'app-in-active-todo',
  templateUrl: './in-active-todo.component.html',
  styleUrls: ['./in-active-todo.component.css']
})
export class InActiveTodoComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit(): void {
    //this.todos = this.todoService.inActiveTodos;
  }

  onSetToActive(index: number) {
    this.todoService.onSetToActive(index);
  }
}
