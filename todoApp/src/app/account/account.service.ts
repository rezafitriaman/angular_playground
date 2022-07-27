import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { LoginOrJoinForm, Todos } from '../models/Todo';
import { TodoService } from '../todo.service';
import { DataStorageService } from '../shared/storage/data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService implements OnDestroy{
    public thereIsError: Subject<string | null> = new Subject<string | null>();
    public isLoadingAccount: Subject<boolean> = new Subject<boolean>();
    public subscriptionFetch: Subscription | undefined;
    public subscriptionSignIn: Subscription | undefined;
    public subscriptionSignUp: Subscription | undefined;

    constructor(private todoService: TodoService, private dataStorageService: DataStorageService,private router: Router) {}

    // isAuthenticated(): Promise<boolean | UrlTree> {
    //     const promise = new Promise((resolve, reject) => {
    //         this.subscriptionFetch = this.dataStorageService.fetchTodos().subscribe(
    //             (todos: Todos) => {
    //                 this.todoService.setTodos(todos);
    //                 resolve(todos);
    //             },
    //             error => {
    //                 console.log('error isAuthenticated---', error);
    //                 reject(error);
    //                 this.thereIsError.next(error);
    //             }
    //         );
    //     });

    //     return promise as Promise<boolean | UrlTree>;
    // }

    initUrl() {
        //console.log('account service', this.todoService.todos);
        //return this.todoService.todos.activeTodos.length > 0 ? '/activeTodo/0' : '/activeTodo';
        return '/activeTodo/';
    }

    onLogin(formValue: LoginOrJoinForm) {
        console.log('submit', formValue);
        
        this.subscriptionSignIn = this.dataStorageService.signInWithPassword(formValue).subscribe(
            restData => {
                // u dont use rest data - becouse it is a pure resdata 
                console.log('account.service-restData', restData);
                this.isLoadingAccount.next(false);
                this.router.navigate([this.initUrl()]);
            },
            errorMessage => {
                this.thereIsError.next(errorMessage);
                this.isLoadingAccount.next(false);
            }
        );
    };

    onSignUp(formValue: LoginOrJoinForm) {
        this.subscriptionSignUp = this.dataStorageService.signUpWithPassword(formValue).subscribe(
            restData => {
                // u dont use rest data - becouse it is a pure resdata 
                console.log('account.service-restData 1', restData);
                this.dataStorageService.storeTodos().subscribe(
                    restData => {
                        console.log('account.service-restData 2', restData);
                        this.isLoadingAccount.next(false);
                        this.router.navigate([this.initUrl()]);        
                    },
                    errorMessage => {
                        this.thereIsError.next(errorMessage);
                        this.isLoadingAccount.next(false);
                    }        
                );
            },
            errorMessage => {
                this.thereIsError.next(errorMessage);
                this.isLoadingAccount.next(false);
            }
        );
    }

    onLogout() {
        this.dataStorageService.autoLogout(0);
    }

    ngOnDestroy(): void {
        this.subscriptionFetch?.unsubscribe();
        this.subscriptionSignUp?.unsubscribe();
        this.subscriptionSignIn?.unsubscribe();
    }
}