import { Component, OnInit } from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  newTodo: string;
  newActiveTodo: {page: string, items: Array<Todo>};
  constructor(private todoService: TodoService) {
    this.newTodo = '';
    this.newActiveTodo = {
      page: '',
      items: [],
    }
  }

  ngOnInit(): void {
  }

  addTodo(newTodo: string) {
    if (newTodo === '') return;

    this.newActiveTodo = {
      page: newTodo,
      items: [],
    }
    this.todoService.addTodo(this.newActiveTodo)
    this.newTodo = '';
  }

  onEnterDown(event: KeyboardEvent, newItem: string) {
    if(newItem === '') return;

    const enterKey = (event.key === 'Enter');

    if(enterKey) {
      this.addTodo(newItem);
    }
  }
}
