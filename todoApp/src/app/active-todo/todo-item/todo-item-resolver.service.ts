import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Todo, Todos } from '../../models/Todo';
import { Observable } from 'rxjs';
import { TodoService } from '../../todo.service';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TodoItemResolverService implements Resolve<Todo[]> {
    constructor(private todoService: TodoService, private dataStorageService: DataStorageService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Todo[]> | Promise<Todo[]> | Todo[] {
        this.todoService.loading.next(true);
        console.log('resolve');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('TodoItemResolverService');
                resolve(this.todoService.getActiveTodoItem(route.params['id']));
                this.todoService.loading.next(false);
            }, 1000);
        });
        // ? dont do the fetch here
        // return this.dataStorageService.fetchTodos().pipe(
        //     map((todos: Todos) => {
        //         console.log('test');
        //         this.todoService.setTodos(todos);
        //         return this.todoService.getActiveTodoItem(+route.params['id']);
        //     })
        // );
    }
}
