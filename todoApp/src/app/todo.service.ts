import { EventEmitter, Injectable } from '@angular/core';
import { InactiveTodo, Todo, TodoPackage } from './models/Todo';
import { of, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    public todos: {
        activeTodos: Array<TodoPackage>;
        inActiveTodos: Array<InactiveTodo>;
    } = {
        activeTodos: [
            {
                label: 'cadeau',
                items: [
                    {
                        id: '13434639321192946',
                        content: 'Dragon fruit',
                        completed: false,
                        editable: false,
                    },
                    {
                        id: '1639321192946',
                        content: 'apple',
                        completed: false,
                        editable: false,
                    },
                    {
                        id: '33333',
                        content: 'Orange',
                        completed: false,
                        editable: false,
                    },
                ],
            },
        ],
        inActiveTodos: [
            {
                id: '33333',
                content: 'Tandenborstel',
                completed: false,
                editable: false,
                label: 'cadeau',
            },
        ],
    };
    public activeTodosAdd: Subject<Array<TodoPackage>> = new Subject<
        Array<TodoPackage>
    >();
    public resetPlaceHolder: Subject<string> = new Subject<string>();
    public updateInActiveTodo: Subject<Array<InactiveTodo>> = new Subject<
        Array<InactiveTodo>
    >();
    public loading: Subject<boolean> = new Subject<boolean>();

    constructor() {}

    getActiveTodoItem(id: number) {
        return this.todos.activeTodos[id].items;
    }

    getActiveTodos(): Array<TodoPackage> {
        return this.todos.activeTodos.slice();
    }

    getInActiveTodos(): Array<InactiveTodo> {
        return this.todos.inActiveTodos.slice();
    }

    onSetToInactive(indexItem: number, todoId: number) {
        this.todos.inActiveTodos.push({
            ...this.todos.activeTodos[todoId].items[indexItem],
            label: this.todos.activeTodos[todoId].label,
        });
        this.todos.activeTodos[todoId].items.splice(indexItem, 1);
    }

    onSetToActive(todoId: number) {
        let labelIndex = this.todos.activeTodos.findIndex(
            (target) => target.label === this.todos.inActiveTodos[todoId].label
        );

        this.todos.activeTodos[labelIndex].items.push({
            id: this.todos.inActiveTodos[todoId].id,
            content: this.todos.inActiveTodos[todoId].content,
            completed: false,
            editable: this.todos.inActiveTodos[todoId].editable,
        });

        this.todos.inActiveTodos.splice(todoId, 1);
        this.updateInActiveTodo.next(this.todos.inActiveTodos);
    }

    onSetToComplete(indexItem: number, todoId: number) {
        this.todos.activeTodos[todoId].items[indexItem].completed =
            !this.todos.activeTodos[todoId].items[indexItem].completed;
    }

    onSetToEditable(indexItem: number, todoId: number, contentText: string) {
        if (this.todos.activeTodos[todoId].items[indexItem].editable)
            this.todos.activeTodos[todoId].items[indexItem].content =
                contentText;

        this.todos.activeTodos[todoId].items[indexItem].editable =
            !this.todos.activeTodos[todoId].items[indexItem].editable;

        return of(this.todos.activeTodos[todoId].items[indexItem].editable);
    }

    addTodo(newTodo: TodoPackage) {
        this.todos.activeTodos.push(newTodo);
        this.activeTodosAdd.next(this.todos.activeTodos.slice());
    }

    addTodoItem(todoItem: Todo, todoId: number) {
        this.todos.activeTodos[todoId].items.push(todoItem);
    }
}
