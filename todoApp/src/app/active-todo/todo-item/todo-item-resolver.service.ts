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
        return new Promise((resolve, reject) => {

            this.dataStorageService.fetchTodos().subscribe((todos: Todos)=>{
                const name = todos.activeTodos.find(activeTodo => activeTodo.name === route.params['id']);
                
                this.todoService.loading.next(false);
                
                resolve(name ? name.items : [])
            })
        });
    }
}
