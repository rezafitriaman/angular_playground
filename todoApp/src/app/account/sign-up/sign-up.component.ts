import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
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
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void {
        console.log('sign up');
    }

    onSubmit() {
        if(this.form?.invalid) return; 
        console.log('form', this.form);

        const email = this.form?.value.email;
        const password = this.form?.value.password;
        const name = this.form?.value.name;
        const lastName = this.form?.value.lastName;

        this.isLoading = true;
        this.accountService.signUp(email, password).subscribe(
            restData => {
                console.log('restData',restData);
                this.isLoading = false;
            },
            error => {
                console.log('error', error);
                this.accountService.onError(error);
                this.isLoading = false;
            }
        );
        this.form?.reset();

        
        //let initUrl = this.accountService.initUrl();
        // this.accountService.onLogin(this.form?.value);
        // this.router.navigate([initUrl]);
        // console.log('form',this.form);

        // this.dataStorageService.createAccount(this.form?.value.email).subscribe((arg) =>{
        //     console.log('account succesfully created', arg);
        //     this.form?.reset()
        // });
    }

    onSignIn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component
        console.log('signup');
        this.router.navigate(['/account/login']);
    }
}
