import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  id: number;
  //editableText: boolean;
  todos: Todo[];
  constructor(private route: ActivatedRoute, private todoService: TodoService) {
    this.id = 0;
    this.todos = []
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.todos = this.todoService.getActiveTodoItem(this.id);
    })
  }

  addNewTodoItem(todoItem: Todo) {
    this.todoService.addTodoItem(todoItem, this.id)
  }

  onSetToComplete(indexItem: number) {
    if(this.todos[indexItem].editable) return;
    this.todoService.onSetToComplete(indexItem, this.id);
  }

  onSetToEditable(indexItem: number) {
    //TODO place the cursor on the text pls
    this.todoService.onSetToEditable(indexItem, this.id);
  }

  onSetToInactive(index: number) {
    //this.todoService.onSetToInactive(index);
  }
}
