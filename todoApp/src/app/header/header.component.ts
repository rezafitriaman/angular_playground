import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() brand: string = '';
    public loggedIn: boolean = false; // false;
    public subscription: Subscription = new Observable().subscribe();

    constructor(private router: Router, private loginService: AccountService) {}

    ngOnInit(): void {
        this.subscription = this.loginService.loggedInInfo.subscribe(
            (loggedInInfo: boolean) => {
                this.loggedIn = loggedInInfo;
            }
        );
    }

    onLogout() {
        this.loginService.onLogout();
        this.router.navigate(['/account/login']);
    }

    onAddNewCategory() {
        console.log('onAddNewCategory');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // get url() {
    //   return (this.todoService.activeTodos.length > 0) ? '/activeTodo' : '/activeTodo';
    // }
}
