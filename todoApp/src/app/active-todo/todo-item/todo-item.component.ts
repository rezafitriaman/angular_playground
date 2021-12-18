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
  todos: Todo[];
  constructor(private route: ActivatedRoute, private todoService: TodoService) {
    this.id = 0;
    this.todos = []
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.todos = this.todoService.getActiveTodo(this.id);
    })

  }

  onSetToComplete(index: number) {
    console.log('onSetToComplete');
    //this.todoService.onSetToComplete(index);
  }

  onSetToInactive(index: number) {
    //this.todoService.onSetToInactive(index);
  }
}
