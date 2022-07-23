import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account/account.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private accountService: AccountService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('authGuard - route', route);
        console.log('authGuard - state', state);

        return this.accountService.isAuthenticated().then((authenticated: boolean | UrlTree) => {
            if (authenticated) {
                console.log('login granted');
                return true;
            } else {
                console.log('login is deny');
                this.router.navigate(['/']);
                return false;
            }
        });
    }
}
