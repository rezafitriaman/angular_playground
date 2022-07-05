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
    public isLoading = false;
    constructor(
        private accountService: AccountService,
        private router: Router,
        private todoService: TodoService
    ) {}

    ngOnInit(): void {
        console.log('sign in');
    }

    onSubmit() {
        let initUrl = this.accountService.initUrl();
        let email = this.form?.value.email;
        let password = this.form?.value.password;

        this.accountService.onLogin(this.form?.value).subscribe(
            restData => {
                console.log('restData',restData);
                this.accountService.loggedInInfo.next(true);
                this.isLoading = false;
            },
            errorMessage => {
                this.accountService.onError(errorMessage);
                this.isLoading = false;
            }
        );
        this.form?.reset();
        this.router.navigate([initUrl]);
    }

    signupBtn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component

        console.log('login');
        this.router.navigate(['/account/signup']);
    }
}
