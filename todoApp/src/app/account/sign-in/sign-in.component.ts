import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

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
        private router: Router
    ) {}

    ngOnInit(): void {
        console.log('sign in');
        this.accountService.isLoadingAccount.subscribe((isLoading: boolean)=> { 
            this.isLoading = isLoading;
        });
    }

    onSubmit() {
        if(this.form?.invalid) return; 
        
        this.isLoading = true;
        this.accountService.onLogin(this.form?.value);
        //this.form?.reset();
    }

    signupBtn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component
        console.log('login');
        this.router.navigate(['/account/signup']);
    }
}