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
    public loggedIn: boolean = false; // set to 'false' if u need to log in;
    public subscription: Subscription = new Observable().subscribe();
    public subscription2: Subscription = new Observable().subscribe();
    public brandUrl = '/';
    public isMenuOpened: boolean = false;

    constructor(
        private router: Router,
        private accountService: AccountService,
    ) {}

    ngOnInit(): void {
        this.subscription = this.accountService.loggedInInfo
            .subscribe((loggedInInfo: boolean) => {
            this.loggedIn = loggedInInfo;
            this.brandUrl = loggedInInfo ? '/activeTodo' : '/';
        });
    }

    toggleMenu() {
        this.isMenuOpened = !this.isMenuOpened;
    }

    clickedOutside(toggle: boolean) {
        this.isMenuOpened = toggle;
    }

    onLogout() {
        this.accountService.onLogout();
        this.router.navigate(['/account/login']);
        this.isMenuOpened = false;
    }

    onAddNewCategory() {
        console.log('onAddNewCategory');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    }
}