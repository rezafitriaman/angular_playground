import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService) { }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;

    if (this.isLoginMode) {
      console.log('u are on login mode')
      this.isLoading = false;
    } else {
      console.log('u are on signup mode')
      
      this.authService.signup(form.value.email, form.value.password).subscribe(restData => {
        this.isLoading = false;
        console.log(restData);
      }, error => {
      this.isLoading = false;
        console.log(error);
        this.error = 'An error occurred!';
      });
    }
    form.reset()
  }

}
