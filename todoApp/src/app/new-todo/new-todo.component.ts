import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {
  newItem: string;
  newTodo: Todo

  constructor(private todoService: TodoService) {
    this.newItem = '';
    this.newTodo = {
      id: '',
      content: '',
      completed: false
    };
  }

  ngOnInit(): void {
  }

  addTodo(newItem: string) {
    if(newItem === '') return;

    this.newTodo = {
      id: Date.now().toString(),
      content: this.newItem,
      completed: false
    };
    //this.todoService.addTodo(this.newTodo);
    this.newItem = '';
  }

  onEnterDown(event: KeyboardEvent, newItem: string) {
    if(newItem === '') return;

    const enterKey = (event.key === 'Enter');

    if(enterKey) {
      this.addTodo(newItem);
    }
  }

}
