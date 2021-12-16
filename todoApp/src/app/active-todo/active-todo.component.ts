import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-active-todo',
  templateUrl: './active-todo.component.html',
  styleUrls: ['./active-todo.component.css']
})
export class ActiveTodoComponent implements OnInit {
  todos: Array<Todo>;

  constructor(private todoService: TodoService) {
    this.todos = []
  }

  ngOnInit(): void {
    this.todos = [{
      id: '1639321192946',
      content: 'Tandenborstel',
      completed: false
    },
    {
      id: '33333',
      content: 'apple',
      completed: false
    }];
  }

  onSetToInactive(index: number) {
    //this.todoService.onSetToInactive(index);
  }

  onSetToComplete(index: number) {
    console.log('onSetToComplete');
    //this.todoService.onSetToComplete(index);
  }
}
