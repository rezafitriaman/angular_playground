import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {

  @ViewChild('f') signupForm: NgForm | undefined
  title = 'forms-example';
  defaultQuestions = 'teacher';
  answer = '';
  genders = ['male', 'female']
  user = {
    username: '',
    email: '',
    secretQuestions: '',
    answer: '',
    gender: ''
  }
  submitted = false;
  constructor() {
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    /*this.signupForm?.setValue({
      userData: {
        username: suggestedName,
        email: '',
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    })*/

    this.signupForm?.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  /*  onSubmit(form: NgForm) {
      console.log('submitted', form)
    }*/
  onSubmit() {
    this.submitted = true;
    //console.log('submitted', this.signupForm)
    this.user.username = this.signupForm?.value.userData.username;
    this.user.email = this.signupForm?.value.userData.email;
    this.user.secretQuestions = this.signupForm?.value.secret;
    this.user.answer = this.signupForm?.value.questionAnswer;
    this.user.gender = this.signupForm?.value.gender;

    this.signupForm?.reset();
  }

}
