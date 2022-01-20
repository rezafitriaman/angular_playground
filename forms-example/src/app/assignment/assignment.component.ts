import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  status = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectName = ['test', 'Test'];
  constructor() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'status': new FormControl('Critical')
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if(this.forbiddenProjectName.indexOf(control.value) > -1) {
      return {'nameIsForbidden': true}
    }
    return null;
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
