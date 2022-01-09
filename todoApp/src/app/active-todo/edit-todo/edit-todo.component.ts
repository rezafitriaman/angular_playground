import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo, TodoPackage} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {ActivatedRoute, Router, UrlTree} from "@angular/router";
import {CanComponentDeactivate} from "../can-deactivate-guard.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  newTodo: string;
  newActiveTodo: TodoPackage;
  changesSaved: boolean;
  loading: boolean;
  subscription: Subscription;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) {
    this.newTodo = '';
    this.newActiveTodo = {
      label: '',
      items: [],
    }
    this.changesSaved = false;
    this.loading = false;
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }

  addTodo(newTodo: string) {
    if (newTodo === '') return;

    this.newActiveTodo = {
      label: newTodo,
      items: [],
    }
    this.todoService.addTodo(this.newActiveTodo);
    this.newTodo = '';
    const lastAdded = this.todoService.getActiveTodos().length - 1;
    this.changesSaved = true;

    this.router.navigate(['../', lastAdded], {relativeTo: this.route})
    this.todoService.loading.next(true);
  }

  onEnterDown(event: KeyboardEvent, newItem: string) {
    if(newItem === '') return;

    const enterKey = (event.key === 'Enter');

    if(enterKey) {
      this.addTodo(newItem);
    }
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.newTodo !== '' && !this.changesSaved) {
      return confirm('Do you want to discard the changes?')
    }else {
      return true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
