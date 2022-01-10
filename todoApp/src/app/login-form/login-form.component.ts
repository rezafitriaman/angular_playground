import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onLogin() {
    this.loginService.onLogin();
    this.router.navigate(['/activeTodo'])
  }

}
