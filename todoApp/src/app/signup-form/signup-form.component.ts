import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  @ViewChild('signInForm') form: NgForm | undefined;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form)
  }

  onSignIn() {
    //TODO create signup screen, maybe rewrite the component that have one parent component
    console.log('login');
    this.router.navigate(['/login'])
  }
}
