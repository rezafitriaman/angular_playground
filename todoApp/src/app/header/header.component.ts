import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { ActiveTodo } from '../models/Todo';
import { TodoService } from '../todo.service';

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

    constructor(
        private router: Router,
        private accountService: AccountService,
        private todoService: TodoService
    ) {}

    ngOnInit(): void {
        this.subscription = this.accountService.loggedInInfo.subscribe((loggedInInfo: boolean) => {
            this.loggedIn = loggedInInfo;
        });

        // change the brandlink to /activeTodo if activeTodo has a value.
        this.subscription2 = this.todoService.activeTodosAdd.subscribe(
            (activeTodo: Array<ActiveTodo>) => {
                let url = activeTodo.length > 0 ? '/activeTodo' : '/';
                this.brandUrl = url;
            }
        );
    }

    onLogout() {
        this.accountService.onLogout();
        this.router.navigate(['/account/login']);
    }

    onAddNewCategory() {
        console.log('onAddNewCategory');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    }

    // get url() {
    //   return (this.todoService.activeTodos.length > 0) ? '/activeTodo' : '/activeTodo';
    // }
}
