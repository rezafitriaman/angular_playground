import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appPickColor]'
})
export class PickColorDirective {
  @Input() defaultColor: string = 'transparent';
  @Input('appPickColor') highlightColor: string = 'green';
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor() {
    this.backgroundColor = this.defaultColor;
  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
