import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {ActivatedRoute, NavigationEnd, Params, Route, Router} from "@angular/router";

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css']
})
export class HeaderItemComponent implements OnInit {
  todos: Array<{page: string, items: Array<Todo>}>;

  constructor(private todoService: TodoService,
              private router: Router,
              private route: ActivatedRoute) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.todos = this.todoService.getActiveTodos();
  }

  onAddNewCategory() {
    console.log('onAddNewCategory')
  }
}
