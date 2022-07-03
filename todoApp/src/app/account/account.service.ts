import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrlTree } from '@angular/router';
import { LoginOrJoinForm, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    public loggedIn: boolean = false; // if u need to loggin set this to 'false'
    public loggedInInfo: Subject<boolean> = new Subject<boolean>();
    public thereIsError: Subject<string | null> = new Subject<string | null>();
    constructor(
        private todoService: TodoService, 
        private dataStorageService: DataStorageService,
        private http: HttpClient
    ) {}

    isAuthenticated(): Promise<boolean | UrlTree> {
        const promise = new Promise((resolve, reject) => {
            this.dataStorageService.fetchTodos()
            .subscribe((todos: Todos) => {
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
        this.loggedInInfo.next(this.loggedIn); // this code tell the header what to display
    }

    onLogout() {
        this.loggedIn = false;
        this.loggedInInfo.next(this.loggedIn); // this code tell the header what to display
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmfRwM7wb9RulolvYQraAVEmiwsh-Wi0A',
            {    
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }

    onError(errorValue: string | null){
        this.thereIsError.next(errorValue);
    }
}