import { Component, OnInit, ViewChild } from '@angular/core';
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
    constructor(
        private accountService: AccountService, 
        private router: Router,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void {
        console.log('sign up');
    }

    onSubmit() {
        let initUrl = this.accountService.initUrl();

        this.accountService.onLogin(this.form?.value);
        this.router.navigate([initUrl]);
        console.log('form',this.form?.value.email);

        this.dataStorageService.createAccount(this.form?.value.email).subscribe((arg) =>{
            console.log('account succesfully created', arg);
        });

    }

    onSignIn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component
        console.log('signup');
        this.router.navigate(['/account/login']);
    }
}
