import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    @ViewChild('signInForm') form: NgForm | undefined;
    public isLoading = false;
    constructor(
        private accountService: AccountService, 
        private router: Router,
    ) {}

    ngOnInit(): void {
        console.log('sign up');
        this.accountService.isLoading.subscribe((isLoading: boolean)=> {
            this.isLoading = isLoading;
        });
    }

    onSubmit() {
        if(this.form?.invalid) return; 

        this.isLoading = true;
        this.accountService.onSignUp(this.form?.value);
        this.form?.reset();
    }

    onSignIn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component
        console.log('signup');
        this.router.navigate(['/account/login']);
    }
}
