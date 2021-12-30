import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-active-todo',
  templateUrl: './active-todo.component.html',
  styleUrls: ['./active-todo.component.css']
})
export class ActiveTodoComponent implements OnInit {
  loading: boolean

  constructor(private todoService: TodoService) {
  this.loading = false;
  }

  ngOnInit(): void {
    this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }
}
