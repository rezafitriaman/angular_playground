import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTouchSlider]'
})
export class TouchSliderDirective {
  initialPositionMouseX: number;
  isPointerDown: boolean;
  
  constructor(private element: ElementRef, private renderer: Renderer2) {    
    this.initialPositionMouseX = 0;
    this.isPointerDown = false;
  }

  get getContainerTransformMatrix(): number {
    const transformValue = getComputedStyle(this.element.nativeElement.children[0]).getPropertyValue('transform');
    const value =  transformValue !== 'none' ? parseInt(transformValue.split(',')[4].trim()) : 0;

    return value;
  }

  get marginLeftAndPaddingLeftParentContainer(): number {
    return parseInt(getComputedStyle(this.element.nativeElement).marginLeft + getComputedStyle(this.element.nativeElement).paddingLeft);
  } 

  getMousePosition(pageX: number): number {
    return pageX - this.marginLeftAndPaddingLeftParentContainer;
  }

  isPointerDownHolded(isPointerDown: boolean) {
    this.isPointerDown = isPointerDown;
    
    if(this.isPointerDown) {
      console.log(this.isPointerDown);
      this.renderer.addClass(this.element.nativeElement.querySelector('#parent-container'), 'cursor-grabbing');
      return;
    }

    this.renderer.removeClass(this.element.nativeElement.querySelector('#parent-container'), 'cursor-grabbing');
  }

  @HostListener('pointerdown', ['$event'])
  onPointerdown(event: MouseEvent) {
    this.initialPositionMouseX = this.getMousePosition(event.pageX);
    this.renderer.setStyle(this.element.nativeElement.querySelector('#parent-container'), 'transform', `translateX(${this.getContainerTransformMatrix}px)`);
    //this.isPointerDownHolded(true);
  }

}
