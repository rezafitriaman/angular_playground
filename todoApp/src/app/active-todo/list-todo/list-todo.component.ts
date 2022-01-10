import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Todo, TodoPackage} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {ActivatedRoute, NavigationEnd, Params, Route, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit, OnDestroy {
  todos: Array<TodoPackage>;
  newItem: boolean;
  subscription: Subscription;

  constructor(private todoService: TodoService,
              private router: Router,
              private route: ActivatedRoute) {
    this.todos = [];
    this.newItem = false;
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.todos = this.todoService.getActiveTodos();
    this.todoService.activeTodosAdd.subscribe((todos: Array<TodoPackage>)=> {
      this.todos = todos;
      this.newItem = true;

      setTimeout(()=>{
        this.newItem = false;
      },4000)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
