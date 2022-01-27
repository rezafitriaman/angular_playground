import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginMode: boolean;
  @ViewChild('loginForm') form: NgForm | undefined;
  constructor(private loginService: AccountService,
              private router: Router) {
    this.loginMode = true;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loginService.onLogin(this.form?.value);
    this.router.navigate(['/activeTodo'])
  }

  onSignup() {
    //TODO create signup screen, maybe rewrite the component that have one parent component
    console.log('login');
    this.router.navigate(['/account/signup'])
  }

}
