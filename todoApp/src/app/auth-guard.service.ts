import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from './account/account.service';
import { User } from './models/User';
import { DataStorageService } from './shared/storage/data-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private dataStorage: DataStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.dataStorage.user.pipe(
            map((user: User | null) => {
                if(user) {
                    return true;
                }

                return this.router.createUrlTree(['/']);
            })
        )
    }
}