import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoService } from 'src/app/todo.service';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(private http: HttpClient, private todoService: TodoService) {}

    storeTodos() {
        const todos = this.todoService.getTodos();
        return this.http.put(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            todos
        );
    }
}
