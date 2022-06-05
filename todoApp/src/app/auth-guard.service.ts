import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AccountService } from './account/account.service';
import { Todo, Todos } from './models/Todo';
import { DataStorageService } from './shared/storage/data-storage.service';
import { TodoService } from './todo.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private dataStorageService: DataStorageService,
        private todoService: TodoService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('authGuard');

        return this.accountService.isAuthenticated()
        .then((authenticated: boolean | UrlTree) => {
            if (authenticated) {
                return true;
            } else {
                console.log('login is deny');
                this.router.navigate(['/']);
                return false;
            }
        });
    }
}
