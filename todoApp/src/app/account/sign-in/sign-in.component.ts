import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../account.service";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginMode: boolean;
  signInTitle: string;
  @ViewChild('loginForm') form: NgForm | undefined;
  constructor(private loginService: AccountService,
              private router: Router,
              private todoService: TodoService) {
    this.loginMode = true;
    this.signInTitle = '';
  }

  ngOnInit(): void {
    console.log(this.todoService.activeTodos.length > 0);
  }

  onSubmit() {
    this.loginService.onLogin(this.form?.value);
    let initUrl = this.todoService.activeTodos.length > 0 ? '/activeTodo/0' : '/activeTodo';
    this.router.navigate([initUrl])
  }

  onSignup() {
    //TODO create signup screen, maybe rewrite the component that have one parent component
    console.log('login');
    this.router.navigate(['/account/signup'])
  }

}
