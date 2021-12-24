import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from "./models/Todo";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  activeTodos: Array<{page: string, items: Array<Todo>}>;
  inActiveTodos: Array<{page: string, items: Array<Todo>}>;
  activeTodosAdd: EventEmitter<Array<{page: string, items: Array<Todo>}>>;
  resetPlaceHolder: EventEmitter<string>;

  constructor() {
    this.activeTodos = [{
      page: 'cadeau',
      items: [{
        id: '13434639321192946',
        content: 'Dragon fruit',
        completed: false,
        editable: false
      },
        {
        id: '1639321192946',
        content: 'apple',
        completed: false,
        editable: false
      },
      {
        id: '33333',
        content: 'Orange',
        completed: false,
        editable: false
      }],
    },
    {
      page: 'tv',
      items: [{
        id: '1639321192946',
        content: 'koffie',
        completed: false,
        editable: false
      },
      {
        id: '33333',
        content: 'laptop',
        completed: false,
        editable: false
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
        completed: false,
        editable: false
      },
      {
        id: '33333',
        content: 'Tandenborstel',
        completed: false,
        editable: false
      }],
    }];
    this.inActiveTodos = [];
    this.activeTodosAdd = new EventEmitter<Array<{page: string; items: Array<Todo>}>>();
    this.resetPlaceHolder = new EventEmitter<string>()
  }

  getActiveTodoItem(id: number) {
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

  onSetToComplete(indexItem: number, todoId: number) {
    this.activeTodos[todoId].items[indexItem].completed = !this.activeTodos[todoId].items[indexItem].completed;
  }

  onSetToEditable(indexItem: number, todoId: number) {
    this.activeTodos[todoId].items[indexItem].editable = !this.activeTodos[todoId].items[indexItem].editable;
  }

  addTodo(newTodo: {page: string, items: Array<Todo>}) {
    this.activeTodos.push(newTodo);
    this.activeTodosAdd.emit(this.activeTodos.slice());
  }

  addTodoItem(todoItem: Todo, todoId: number) {
    console.log(this.activeTodos[todoId].items.push(todoItem));
  }
}
