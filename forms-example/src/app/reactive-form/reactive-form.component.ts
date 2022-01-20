import { Component, OnInit } from '@angular/core';
import {AbstractControl, Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders: Array<string>;
  signupForm2: FormGroup;
  forbiddenUsernames = ['reza', 'ega']

  constructor() {
    this.genders = ['Male', 'Female'];
    this.signupForm2 = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

  }

  ngOnInit(): void {
    this.signupForm2.valueChanges.subscribe((value)=> {

    })
    this.signupForm2.statusChanges.subscribe((value)=> {

    })
    this.signupForm2.setValue({
      userData: {
        'username': 'max',
        'email': 'reza@G.com'
      },
      'gender': 'Male',
      'hobbies': []
    })
/*    this.signupForm2.patchValue({
      gender: 'Female'
    })*/
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm2.get('hobbies') as FormArray).push(control);
  }

  get hobbies () {
    return (this.signupForm2.get('hobbies') as FormArray).controls
  }

  onSubmit() {

    //console.log(this.signupForm2.get('userData.username')?.errors?.required);
    this.signupForm2.reset({gender: 'Male'});
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if(this.forbiddenUsernames.indexOf(control.value) > -1) {
      return {'nameIsForbidden': true}
    }
    return null
  }

  forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)=> {
      setTimeout(()=> {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        }else {
          resolve(null);
        }
      },2000)
    })

    return promise;
  }

}
