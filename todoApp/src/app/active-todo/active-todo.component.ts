import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-active-todo',
  templateUrl: './active-todo.component.html',
  styleUrls: ['./active-todo.component.css']
})
export class ActiveTodoComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(private todoService: TodoService) {
    this.loading = false;
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
