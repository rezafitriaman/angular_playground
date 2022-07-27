import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AccountService } from "./account/account.service";
import { Todos } from "./models/Todo";
import { DataStorageService } from "./shared/storage/data-storage.service";
import { TodoService } from "./todo.service";

@Injectable({
    providedIn: 'root'
})
export class TodosResolverService implements Resolve<Todos> {
    public subscriptionFetch: Subscription | undefined;

    constructor(private todoService: TodoService, private dataStorageService: DataStorageService, private accountService: AccountService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Todos> | Promise<Todos> | Todos {
        this.todoService.isLoadingTodo.next(true);

        return new Promise((resolve, reject) => {
            this.subscriptionFetch = this.dataStorageService.fetchTodos().subscribe(
                (todos: Todos) => {
                    this.todoService.isLoadingTodo.next(false);
                    resolve(todos);
                },
                error => {
                    console.log('error todos reslver---', error);
                    reject(error);
                    this.accountService.thereIsError.next(error);
                }
            );
        });
    }
}