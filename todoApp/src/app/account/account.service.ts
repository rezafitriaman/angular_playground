import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrlTree } from '@angular/router';
import { LoginOrJoinForm, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../shared/storage/data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    public loggedIn: boolean = false; // if u need to loggin set this to 'false'
    public loggedInInfo: Subject<boolean> = new Subject<boolean>();
    constructor(private todoService: TodoService, private dataStorageService: DataStorageService) {}

    isAuthenticated(): Promise<boolean | UrlTree> {
        const promise = new Promise((resolve, reject) => {
            this.dataStorageService.fetchTodos().subscribe((todos: Todos) => {
                this.todoService.setTodos(todos);
                resolve(this.loggedIn);
            });
        });

        return promise as Promise<boolean | UrlTree>;
    }

    initUrl() {
        //console.log('account service', this.todoService.todos);
        //return this.todoService.todos.activeTodos.length > 0 ? '/activeTodo/0' : '/activeTodo';
        return '/activeTodo';
    }

    onLogin(formValue: LoginOrJoinForm) {
        console.log('submit', formValue);
        this.loggedIn = true;
        this.loggedInInfo.next(this.loggedIn);
    }

    onLogout() {
        this.loggedIn = false;
        this.loggedInInfo.next(this.loggedIn);
    }
}
