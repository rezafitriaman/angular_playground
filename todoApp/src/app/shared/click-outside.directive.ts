import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy{
    @Output() clickOutside = new EventEmitter<boolean>();
    public documentClickSubscription: Subscription | undefined;

    constructor (
        private element: ElementRef, 
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngAfterViewInit() {
        this.documentClickSubscription = fromEvent(this.document, 'click').pipe(
            map(elm => {
            return this.isInside(elm.target as HTMLElement);
        })).subscribe((target)=> {
            if (target) return;
            this.clickOutside.emit(target);
        });
    }

    isInside(elementToCheck: HTMLElement) {
        return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
    }

    ngOnDestroy() {
        this.documentClickSubscription?.unsubscribe();
    }
}