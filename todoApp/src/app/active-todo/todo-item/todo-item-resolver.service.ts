import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs';
import { TodoService } from '../../todo.service';

@Injectable({
    providedIn: 'root',
})
export class TodoItemResolverService implements Resolve<Todo[]> {
    constructor(private todoService: TodoService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Todo[]> | Promise<Todo[]> | Todo[] {
        this.todoService.loading.next(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('TodoItemResolverService');
                resolve(
                    this.todoService.getActiveTodoItem(+route.params['id'])
                );
                this.todoService.loading.next(false);
            }, 1000);
        });
    }
}
