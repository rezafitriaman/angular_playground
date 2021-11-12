import {Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.backgroundColor = 'transparent';
  }

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'hotpink');
    this.renderer.listen(this.elRef.nativeElement, 'mouseenter', ()=> {
      console.log('i enter it');
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'hotpink');
    });

    this.renderer.listen(this.elRef.nativeElement, 'mouseleave', ()=> {
      console.log('i exit it');
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    });
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'hotpink');
    //this.backgroundColor = 'red'; // because of HostBinding
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    //this.backgroundColor = 'transparent'; // because of HostBinding
  }
}
