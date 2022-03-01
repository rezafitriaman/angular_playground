import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveTodo, Todo, Todos } from 'src/app/models/Todo';
import { TodoService } from 'src/app/todo.service';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(private http: HttpClient, private todoService: TodoService) {}

    storeTodos() {
        const todos = this.todoService.getTodos();

        return this.http.put<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json',
            todos
        );
    }

    fetchTodos() {
        return this.http.get<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json'
        );
    }
    // ? fix this
    postTodos(todo: ActiveTodo) {
        return this.http.post<Todo>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/0/items.json',
            {
                
                    completed: false,
                    content: 'vliegen',
                    editable: false,
                
            }
        );
    }
}
