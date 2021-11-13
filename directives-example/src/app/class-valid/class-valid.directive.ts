import {Directive, HostBinding} from '@angular/core';
import {NgModel} from "@angular/forms";

@Directive({
  selector: '[ngModel]'
})
export class ClassValidDirective {

  constructor(public control: NgModel) {}

  @HostBinding('class.validate') get valid() { console.log(this.control.valid); return this.control.valid; }
  @HostBinding('class.invalid') get invalid() { console.log(this.control.invalid); return this.control.invalid; }
}

