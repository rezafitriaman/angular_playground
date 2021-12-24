import { Component, OnInit } from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {ActivatedRoute, Router, UrlTree} from "@angular/router";
import {CanComponentDeactivate} from "../can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit, CanComponentDeactivate {
  newTodo: string;
  newActiveTodo: {page: string, items: Array<Todo>};
  changesSaved: boolean;
  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) {
    this.newTodo = '';
    this.newActiveTodo = {
      page: '',
      items: [],
    }
    this.changesSaved = false;
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
    const lastAdded = this.todoService.getActiveTodos().length - 1;
    this.changesSaved = true;

    this.router.navigate(['../', lastAdded], {relativeTo: this.route})
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
}
