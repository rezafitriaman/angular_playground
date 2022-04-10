import { Injectable } from '@angular/core';
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
    public activeTodosItemUpdate: Subject<Array<Todo>> = new Subject<Array<Todo>>();
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

    onSetToInactive(todoListIdName: string, itemIdName: string) {
        console.log('on set to inactive');
        console.log('todoListIdName', todoListIdName);
        console.log('itemIdName', itemIdName);
        let todoIndex = this.todos.activeTodos.findIndex(activeTodo => {
            return activeTodo.name === todoListIdName;
        })
        
        let itemIndex = this.todos.activeTodos[todoIndex].items.findIndex(item => {
            return item.name === itemIdName;
        })

        console.log( this.todos.activeTodos[todoIndex].items);
        this.todos.activeTodos[todoIndex].items.splice(itemIndex, 1);
        this.activeTodosItemUpdate.next(this.todos.activeTodos[todoIndex].items.slice());
        
        // TODO push to inActive list
        // const label = this.todos.activeTodos[todoId].label;
        // const todo = this.todos.activeTodos[todoId].items[indexItem];

        // this.todos.inActiveTodos.push(new InactiveTodo(label, todo));
        // this.todos.activeTodos[todoId].items.splice(indexItem, 1);
    }

    onSetToComplete(todoListIdName: string, itemIdName: string, isCompleted: boolean) {
        let todoIndex = this.todos.activeTodos.findIndex(activeTodo => {
            return activeTodo.name === todoListIdName;
        })

        let itemIndex = this.todos.activeTodos[todoIndex].items.findIndex(item => {
            return item.name === itemIdName;
        })

        this.todos.activeTodos[todoIndex].items[itemIndex].completed = isCompleted

        this.activeTodosItemUpdate.next(this.todos.activeTodos[todoIndex].items.slice());
    }

    onSetToEditable(todoListIdName: string, itemIdName: string, contentText: string) {
        let todo = this.todos.activeTodos.find(activeTodo => {
            return activeTodo.name === todoListIdName;
        })
        
        if (!todo) return false;
        
        let targetItemId = todo.items.findIndex(item => {
            return item.name === itemIdName
        })
        
        if (todo.items[targetItemId].editable) {
            todo.items[targetItemId].content = contentText;
        }

        todo.items[targetItemId].editable = !todo?.items[targetItemId].editable        
        this.activeTodosItemUpdate.next(todo.items.slice());

        return todo.items[targetItemId].editable
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

        this.activeTodosItemUpdate.next(this.todos.activeTodos[activeTodoIndex].items.slice());
    }
}
