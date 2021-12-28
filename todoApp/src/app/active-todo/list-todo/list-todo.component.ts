import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {ActivatedRoute, NavigationEnd, Params, Route, Router} from "@angular/router";


@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  todos: Array<{page: string, items: Array<Todo>}>;
  newItem: boolean;
  constructor(private todoService: TodoService,
              private router: Router,
              private route: ActivatedRoute) {
    this.todos = [];
    this.newItem = false;
  }

  ngOnInit(): void {
    this.todos = this.todoService.getActiveTodos();
    this.todoService.activeTodosAdd.subscribe((todos: Array<{page: string, items: Array<Todo>}>)=> {
      this.todos = todos;
      this.newItem = true;
      setTimeout(()=>{
        this.newItem = false;
      },4000)
    });
  }
}
