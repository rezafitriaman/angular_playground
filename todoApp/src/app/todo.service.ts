import { EventEmitter, Injectable } from '@angular/core';
import { ActiveTodo, InactiveTodo, Todo, Todos } from './models/Todo';
import { of, Subject } from 'rxjs';
import { DataStorageService } from './shared/storage/data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    public todos: Todos = {
        activeTodos: [],
        inActiveTodos: [],
    };
    public activeTodosAdd: Subject<Array<ActiveTodo>> = new Subject<Array<ActiveTodo>>();
    public activeTodosItemAdd: Subject<Array<Todo>> = new Subject<Array<Todo>>();
    public resetPlaceHolder: Subject<string> = new Subject<string>();
    public updateInActiveTodo: Subject<Array<InactiveTodo>> = new Subject<Array<InactiveTodo>>();
    public loading: Subject<boolean> = new Subject<boolean>();

    constructor() {}
    
    setTodos(todos: Todos) {
        this.todos = todos;
        this.activeTodosAdd.next(this.todos.activeTodos.slice());
    }
 
    
    getTodos() {
        return this.todos;
    }

    getActiveTodos(): Array<ActiveTodo> {
        return this.todos.activeTodos.slice();
    }

    getActiveTodoItem(id: string) {
        const activeTodo: ActiveTodo | undefined = this.todos.activeTodos.find((value)=>{
            return value.name === id;
        })
        
        return activeTodo ? activeTodo.items : [];
    }

    getInActiveTodos(): Array<InactiveTodo> {
        return this.todos.inActiveTodos.slice();
    }

    onSetToInactive(indexItem: number, todoId: string, itemId: string | undefined) {
        if(!itemId) return;
        itemId
        // const label = this.todos.activeTodos[todoId].label;
        // const todo = this.todos.activeTodos[todoId].items[indexItem];

        // this.todos.inActiveTodos.push(new InactiveTodo(label, todo));
        // this.todos.activeTodos[todoId].items.splice(indexItem, 1);
    }

    onSetToActive(todoId: string) {
        // let labelIndex = this.todos.activeTodos.findIndex(
        //     (target) => target.label === this.todos.inActiveTodos[todoId].label
        // );

        // this.todos.activeTodos[labelIndex].items.push(
        //     new Todo(this.todos.inActiveTodos[todoId].todo.content, false, false) // fix the id
        // );

        // this.todos.inActiveTodos.splice(todoId, 1);
        // this.updateInActiveTodo.next(this.todos.inActiveTodos);
    }

    onSetToComplete(indexItem: number, todoId: string) {
        // this.todos.activeTodos[todoId].items[indexItem].completed =
        //     !this.todos.activeTodos[todoId].items[indexItem].completed;
    }

    onSetToEditable(todoListIdName: string, itemId: string, contentText: string) {
        let todoIdName = this.todos.activeTodos.find(activeTodo => {
            return activeTodo.name === todoListIdName;
        })
        
        if (!todoIdName) return false;
        
        let targetItemId = todoIdName.items.findIndex(item => {
            return item.name === itemId
        })
        
        if (todoIdName.items[targetItemId].editable) {
            todoIdName.items[targetItemId].content = contentText;
        }

        todoIdName.items[targetItemId].editable = !todoIdName?.items[targetItemId].editable        
        this.activeTodosItemAdd.next(todoIdName.items.slice());

        return todoIdName.items[targetItemId].editable
    }

    addTodo(newTodo: ActiveTodo) {
        this.todos.activeTodos.push(newTodo);
        this.activeTodosAdd.next(this.todos.activeTodos.slice());
    }

    addTodoItem(todoItem: Todo, todoId: string) {
        const activeTodoIndex = this.todos.activeTodos.findIndex(value=> {
           return value.name === todoId; 
        })

        this.todos.activeTodos[activeTodoIndex].items.push(todoItem);

        this.activeTodosItemAdd.next(this.todos.activeTodos[activeTodoIndex].items.slice());
    }
}
