import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from "./models/Todo";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  activeTodos: Array<{page: string, items: Array<Todo>}>;
  inActiveTodos: Array<{page: string, items: Array<Todo>}>;
  activeTodosAdd: EventEmitter<Array<{page: string, items: Array<Todo>}>>;
  constructor() {
    this.activeTodos = [{
      page: 'cadeau',
      items: [{
        id: '1639321192946',
        content: 'apple',
        completed: false
      },
      {
        id: '33333',
        content: 'Orange',
        completed: false
      }],
    },
    {
      page: 'tv',
      items: [{
        id: '1639321192946',
        content: 'koffie',
        completed: false
      },
      {
        id: '33333',
        content: 'laptop',
        completed: false
      }],
    },
      {
        page: 'game',
        items: [],
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
    this.activeTodosAdd = new EventEmitter<Array<{page: string; items: Array<Todo>}>>();
  }

  getActiveTodo(id: number) {
    return this.activeTodos[id].items
  }

  getActiveTodos() {
    return this.activeTodos.slice();
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

  addTodo(newTodo: {page: string, items: Array<Todo>}) {
    this.activeTodos.push(newTodo);
    console.log(this.activeTodos);
    this.activeTodosAdd.emit(this.activeTodos.slice());
  }
}
