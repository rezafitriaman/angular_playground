import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      console.log('u are on login mode')
      authObs = this.authService.login(form.value.email, form.value.password)
    } else {
      console.log('u are on signup mode')
      authObs = this.authService.signup(form.value.email, form.value.password)
    }
    
    authObs.subscribe(restData => {
      this.isLoading = false;
      console.log(restData);
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      this.isLoading = false;
      console.log(errorMessage);
      this.error = errorMessage;
    });

    form.reset()
  }

}
