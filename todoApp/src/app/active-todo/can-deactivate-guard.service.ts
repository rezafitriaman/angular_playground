import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
export interface CanComponentDeactivate {
    canDeactivate: () =>
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree;
}

@Injectable({
    providedIn: 'root',
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
    constructor() {}

    canDeactivate (
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate();
    }
}
