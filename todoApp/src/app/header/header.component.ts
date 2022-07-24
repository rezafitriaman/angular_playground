import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../models/User';
import { DataStorageService } from '../shared/storage/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() brand: string = '';
    //public loggedIn: boolean = false; // set to 'false' if u need to log in;
    public isAuthenticatedAndHasUser: boolean = false
    public subscription: Subscription | undefined;
    public brandUrl = '/';
    public isMenuOpened: boolean = false;

    constructor(private accountService: AccountService, private dataStorageService: DataStorageService) {}

    ngOnInit(): void {
        this.subscription = this.dataStorageService.user.subscribe((user: User | null) => {
            this.isAuthenticatedAndHasUser = user ? true : false;
            this.brandUrl = user ? '/activeTodo' : '/';
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
        this.isMenuOpened = false;
    }

    onAddNewCategory() {
        console.log('onAddNewCategory');
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}