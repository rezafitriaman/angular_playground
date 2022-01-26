import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {InactiveTodo, Todo} from "../models/Todo";

@Component({
  selector: 'app-in-active-todo',
  templateUrl: './in-active-todo.component.html',
  styleUrls: ['./inactive-todo.component.css']
})
export class InActiveTodoComponent implements OnInit {
  todos: Array<InactiveTodo>;
  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todos = this.todoService.getInActiveTodos();
    this.todoService.updateInActiveTodo.subscribe((inActiveTodos)=> {
      this.todos = inActiveTodos;
    })
  }

  onSetToActive(index: number) {
    this.todoService.onSetToActive(index);
  }
}
