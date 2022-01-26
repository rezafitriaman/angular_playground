import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginOrJoinForm} from "../models/Todo";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginMode: boolean;
  @ViewChild('loginOrJoinForm') form: NgForm | undefined;

  constructor(private loginService: LoginService,
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
    console.log('signup');
    this.router.navigate(['/signup'])
  }
}
