import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { LoginOrJoinForm, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../shared/storage/data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    public loggedInInfo: Subject<boolean> = new Subject<boolean>();
    public thereIsError: Subject<string | null> = new Subject<string | null>();
    public isLoading: Subject<boolean> = new Subject<boolean>();
    constructor(
        private todoService: TodoService, 
        private dataStorageService: DataStorageService,
        private router: Router
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
        return '/activeTodo/';
    }

    onLogin(formValue: LoginOrJoinForm) {
        console.log('submit', formValue);
        
        this.dataStorageService.signInWithPassword(formValue).subscribe(
            restData => {
                // u dont use rest data - becouse it is a pure resdata 
                //this.accountService.loggedInInfo.next(true); // this code tell the header what to display
                console.log('account.service-restData', restData);
                this.isLoading.next(false);
                this.router.navigate([this.initUrl()]);
            },
            errorMessage => {
                this.thereIsError.next(errorMessage);
                this.isLoading.next(false);
            }
        );
    };

    onSignUp(formValue: LoginOrJoinForm) {
        this.dataStorageService.signUpWithPassword(formValue).subscribe(
            restData => {
                // u dont use rest data - becouse it is a pure resdata 
                //this.accountService.loggedInInfo.next(true); // this code tell the header what to display
                console.log('account.service-restData 1', restData);
                this.dataStorageService.storeTodos().subscribe(
                    restData => {
                        console.log('account.service-restData 2', restData);
                        this.isLoading.next(false);
                        this.router.navigate([this.initUrl()]);        
                    },
                    errorMessage => {
                        this.thereIsError.next(errorMessage);
                        this.isLoading.next(false);
                    }        
                );
            },
            errorMessage => {
                this.thereIsError.next(errorMessage);
                this.isLoading.next(false);
            }
        );
    }

    onLogout() {
        this.loggedInInfo.next(false); // this code tell the header what to display
    }
}