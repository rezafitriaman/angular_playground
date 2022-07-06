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
        let initUrl = this.accountService.initUrl();

        this.isLoading = true;
        this.accountService.onSignUp(this.form?.value).subscribe(
            restData => {
                console.log('restData',restData);
                this.accountService.loggedInInfo.next(true);
                this.isLoading = false;
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
                this.isLoading = false;
            }
        );
        this.form?.reset();
        this.router.navigate([initUrl]);

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
