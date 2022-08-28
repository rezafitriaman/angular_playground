import { ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveTodoService {
  public resetSlider: Subject<boolean> = new Subject<boolean>();
  public renderer: Renderer2;

  constructor(private _renderer: RendererFactory2) {
    this.renderer = _renderer.createRenderer(null, null);
  }
  
  getElmWidth(targetElm: ElementRef): number {
    return parseInt(getComputedStyle(targetElm.nativeElement).width) - (parseInt(getComputedStyle(targetElm.nativeElement).paddingLeft) * 2);
  }

  getBreakpoints(breakPoints: 'sm' | 'md' | 'lg' | 'xl' | '2xl') {
    switch (breakPoints) {
      case 'sm':
        return 640;
      case 'md':
        return 768;
      case 'lg':
        return 1024;
      case 'xl':
        return 1280;
      case '2xl':
        return 1536;
      default:
        return -1;
    }
  }

  hideBtn(targetElm: ElementRef) {
    this.renderer.addClass(targetElm.nativeElement, 'hidden');
  }

  showBtn(targetElm: ElementRef) {
    this.renderer.removeClass(targetElm.nativeElement, 'hidden');
  }
}
