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

        console.log('set todo', this.todos);
        //console.log('set todo', this.todos.activeTodos);

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

    onSetToInactive(indexItem: number, todoId: string) {
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

    onSetToEditable(indexItem: number, todoListIdName: string, contentText: string) {

        let targetedIdName = this.todos.activeTodos.find(activeTodo => {
            return activeTodo.name === todoListIdName;
        })

        if (!targetedIdName) return  of(false);

        if (targetedIdName.items[indexItem].editable) {
            targetedIdName.items[indexItem].content = contentText;
        }

        targetedIdName.items[indexItem].editable = !targetedIdName?.items[indexItem].editable
       console.log('todo serveice', targetedIdName.items[indexItem].editable); 
        return of(targetedIdName.items[indexItem].editable)
        
    }

    addTodo(newTodo: ActiveTodo) {
        this.todos.activeTodos.push(newTodo);
        this.activeTodosAdd.next(this.todos.activeTodos.slice());
    }

    addTodoItem(todoItem: Todo, todoId: string) {
        console.log('todo item',todoItem);
        console.log('this.todos.activeTodos',this.todos.activeTodos);
        console.log('todo id',todoId);

        const activeTodoIndex = this.todos.activeTodos.findIndex(value=> {
           console.log('value', value.name);
           return value.name === todoId; 
        })

        this.todos.activeTodos[activeTodoIndex].items.push(todoItem);
        console.log('object', this.todos.activeTodos[activeTodoIndex]);

        this.activeTodosItemAdd.next(this.todos.activeTodos[activeTodoIndex].items.slice());
    }
}
