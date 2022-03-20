import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { TodoService } from '../../todo.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
    @ViewChild('loginForm') form: NgForm | undefined;
    public signInTitle: string = '';
    constructor(
        private accountService: AccountService,
        private router: Router,
        private todoService: TodoService
    ) {}

    ngOnInit(): void {}

    onSubmit() {
        let initUrl = this.accountService.initUrl();

        this.accountService.onLogin(this.form?.value);
        this.router.navigate([initUrl]);
    }

    onSignup() {
        //TODO create signup screen, maybe rewrite the component that have one parent component

        console.log('login');
        this.router.navigate(['/account/signup']);
    }
}
