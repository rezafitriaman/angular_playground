import { Injectable } from '@angular/core';
import { ActiveTodo, InactiveTodo, Todo, Todos } from './models/Todo';
import { of, Subject } from 'rxjs';
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
    }

    setActiveTodo(activeTodos: Array<ActiveTodo>) {
        console.log('object origin active todos', this.todos);
        this.todos.activeTodos = activeTodos;
        this.activeTodosAdd.next(this.todos.activeTodos.slice());
        console.log('setIn active todo', this.todos);
    }

    setInActiveTodo(inActiveTodo: Array<InactiveTodo>) {
        this.todos.inActiveTodos = inActiveTodo;
        this.updateInActiveTodo.next(this.todos.inActiveTodos);
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

    onSetToActive(labelId: string, todoId: string) {
        console.log('set to active1', this.todos.activeTodos);
        let inActiveTodoIndex = this.todos.inActiveTodos.findIndex(inActiveTodo => {
            return inActiveTodo.todo.id === todoId;
        });

        let activeTodoIndex = this.todos.activeTodos.findIndex(activeTodo => {
            return activeTodo.name === labelId;
        });

        let content = this.todos.inActiveTodos[inActiveTodoIndex].todo.content;
        let completed = false;
        let editable = this.todos.inActiveTodos[inActiveTodoIndex].todo.editable;
        let id = this.todos.inActiveTodos[inActiveTodoIndex].todo.id;
        console.log('set to active', this.todos.activeTodos[activeTodoIndex]);
        this.todos.activeTodos[activeTodoIndex].items.push(new Todo(content, completed, editable, id));
        this.todos.inActiveTodos.splice(inActiveTodoIndex, 1);
        this.updateInActiveTodo.next(this.todos.inActiveTodos);
    }

    onSetToInactive(todoListIdName: string, itemIdName: string) {
        let todoIndex = this.todos.activeTodos.findIndex(activeTodo => {
            return activeTodo.name === todoListIdName;
        })
        
        let itemIndex = this.todos.activeTodos[todoIndex].items.findIndex(item => {
            return item.id === itemIdName;
        })

        let label = this.todos.activeTodos[todoIndex].label;
        let todo = this.todos.activeTodos[todoIndex].items[itemIndex];
        let activeTodoId = this.todos.activeTodos[todoIndex].name;

        this.todos.activeTodos[todoIndex].items.splice(itemIndex, 1);

        this.todos.inActiveTodos.push(new InactiveTodo(label, todo, activeTodoId));

        this.activeTodosItemUpdate.next(this.todos.activeTodos[todoIndex].items.slice());
    }

    onSetToComplete(todoListIdName: string, itemId: string, isCompleted: boolean) {
        let todoIndex = this.todos.activeTodos.findIndex(activeTodo => {
            return activeTodo.name === todoListIdName;
        })

        let itemIndex = this.todos.activeTodos[todoIndex].items.findIndex(item => {
            return item.id === itemId;
        })

        this.todos.activeTodos[todoIndex].items[itemIndex].completed = isCompleted

        this.activeTodosItemUpdate.next(this.todos.activeTodos[todoIndex].items.slice());
    }

    onSetToEditable(todoListIdName: string, itemId: string, contentText: string) {
        let todo = this.todos.activeTodos.find(activeTodo => {
            return activeTodo.name === todoListIdName;
        })
        
        if (!todo) return false;
        
        let targetItemId = todo.items.findIndex(item => {
            return item.id === itemId
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