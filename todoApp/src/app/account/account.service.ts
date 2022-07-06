import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { UrlTree } from '@angular/router';
import { LoginOrJoinForm, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../shared/storage/data-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AccountService {
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
                resolve(true);
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

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmfRwM7wb9RulolvYQraAVEmiwsh-Wi0A',
            {
                email: formValue.email,
                password: formValue.password,
                returnSecureToken: true
            }        
        ).pipe(catchError(this.handleError));
    }

    onLogout() {
        this.loggedInInfo.next(false); // this code tell the header what to display
    }

    onSignUp(formValue: LoginOrJoinForm) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmfRwM7wb9RulolvYQraAVEmiwsh-Wi0A',
            {    
                email: formValue.email,
                password: formValue.password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        console.log('errorRes', errorRes);
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);    
        }

        switch (errorRes.error.error.message) { //TODO 299
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password isgn-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            default:
                errorMessage = 'An unknown error occurred!';
                break;
        }

        return throwError(errorMessage);
    }
}