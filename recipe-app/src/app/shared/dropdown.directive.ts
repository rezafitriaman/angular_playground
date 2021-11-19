import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export  class DropdownDirective{
  @HostBinding('class.show') isOpen = false;

  constructor(private targetEl: ElementRef) {
  }
  @HostListener('document:click', ['$event']) onMouseClick(event: Event) {
    this.isOpen = this.targetEl.nativeElement.contains(event.target) ? !this.isOpen : false;
    this.addClass();
  }
  private addClass() {
    const targetChildren: HTMLCollection = this.targetEl.nativeElement.children;
    for (let i = 0; i < targetChildren.length; i++) {
      this.toggle(targetChildren[i] as HTMLElement);
    }
  }

  private toggle(target: HTMLElement) {
    if(this.isOpen) {
      target.classList.add('show');
    }else {
      target.classList.remove('show');
    }
  }
}
