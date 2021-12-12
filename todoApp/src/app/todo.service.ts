import { Injectable } from '@angular/core';
import {Todo} from "./models/Todo";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  activeTodos: Array<{page: string, items: Array<Todo>}>;
  inActiveTodos: Array<{page: string, items: Array<Todo>}>;

  constructor() {
    this.activeTodos = [{
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
    this.inActiveTodos = [];
  }

  onSetToInactive(index: number) {
    /*this.inActiveTodos.push(this.activeTodos[index]);
    this.activeTodos.splice(index,1);*/
  }

  onSetToActive(index: number) {
    /*this.inActiveTodos[index].completed = false;
    this.activeTodos.push(this.inActiveTodos[index]);
    this.inActiveTodos.splice(index, 1);*/
  }

  onSetToComplete(index: number) {
    /*this.activeTodos[index].completed = !this.activeTodos[index].completed;*/
  }

  addTodo(newTodo: Todo) {
    /*console.log(newTodo)
    this.activeTodos.push(newTodo);*/
  }
}
