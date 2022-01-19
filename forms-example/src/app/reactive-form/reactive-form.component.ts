import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders: Array<string>;
  signupForm2: FormGroup;

  constructor() {
    this.genders = ['Male', 'Female'];
    this.signupForm2 = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });
  }

  ngOnInit(): void {

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm2.get('hobbies') as FormArray).push(control);
  }

  get hobbies () {
    console.log('form array', this.signupForm2.get('hobbies'))
    return (this.signupForm2.get('hobbies') as FormArray).controls
  }

  onSubmit() {
    console.log(this.signupForm2);
  }

}
