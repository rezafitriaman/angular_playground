import { Component, OnInit, ViewChild } from '@angular/core';
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
    constructor(private loginService: AccountService, private router: Router) {}

    ngOnInit(): void {}

    onSubmit() {
        let initUrl = this.loginService.initUrl();

        this.loginService.onLogin(this.form?.value);
        this.router.navigate([initUrl]);
    }

    onSignIn() {
        //TODO create signup screen, maybe rewrite the component that have one parent component
        console.log('signup');
        this.router.navigate(['/account/login']);
    }
}
