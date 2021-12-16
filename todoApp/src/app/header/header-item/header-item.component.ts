import { Component, OnInit } from '@angular/core';
import {Todo} from "../../models/Todo";

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css']
})
export class HeaderItemComponent implements OnInit {
  todos: Array<{page: string, items: Array<Todo>}>;

  constructor() {
    this.todos = [{
      page: 'cadeau',
      items: [{
        id: '1639321192946',
        content: 'Tandenborstel',
        completed: false
      },
        {
          id: '33333',
          content: 'Tandenborstel',
          completed: false
        }],
    },
      {
        page: 'tv',
        items: [{
          id: '1639321192946',
          content: 'Tandenborstel',
          completed: false
        },
          {
            id: '33333',
            content: 'Tandenborstel',
            completed: false
          }],
      },
      {
        page: 'vliegen',
        items: [{
          id: '1639321192946',
          content: 'Tandenborstel',
          completed: false
        },
          {
            id: '33333',
            content: 'Tandenborstel',
            completed: false
          }],
      }];
  }

  ngOnInit(): void {
  }

}
