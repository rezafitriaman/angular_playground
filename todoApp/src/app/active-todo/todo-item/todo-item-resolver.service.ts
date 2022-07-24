import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ActiveTodo, Todo, Todos } from '../../models/Todo';
import { Observable } from 'rxjs';
import { TodoService } from '../../todo.service';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { map, take, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
    providedIn: 'root',
})
export class TodoItemResolverService implements Resolve<ActiveTodo> {
    constructor(private todoService: TodoService, private dataStorageService: DataStorageService, private accountService: AccountService) {}
    
    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<ActiveTodo> | Promise<ActiveTodo> | ActiveTodo {
        this.todoService.isLoadingTodo.next(true);
        console.log('TodoItemResolverService');
        return new Promise((resolve, reject) => {

            this.dataStorageService.fetchTodos().subscribe(
                (todos: Todos) => {
                    console.log('state', state);
                    console.log('route', route);
                    const activeTodos = todos.activeTodos.find(activeTodo => activeTodo.name === route.params['id']);
                    this.todoService.isLoadingTodo.next(false);
                    resolve(activeTodos ? activeTodos : {items: [], label: '', name: ''})
                },
                error => {
                    reject(error);
                    this.accountService.thereIsError.next(error)
                }
            )
        });
    }
}