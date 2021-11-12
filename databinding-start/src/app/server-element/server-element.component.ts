import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ViewChild, ContentChild
} from '@angular/core';
import {Elements} from "../types";

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss']
})
export class ServerElementComponent implements OnInit,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy{
  @Input('srvElement') element: Elements;
  @Input()name: string;
  @ViewChild('heading',{ static: true }) heading: ElementRef | undefined;
  @ContentChild('contentParagraph',{ static: true }) contentParagraph: ElementRef | undefined;
  constructor() {
    this.element = {type: '', name: '', content: ''}
    this.name = '';
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log('ngOnChanges');
    console.log('changes', changes);
  }

    ngDoCheck(): void {
      console.log('ngDoCheck');
    }

    ngAfterContentInit() {
      console.log('ngAfterContentInit');
      console.log('ContentParagraph---->', this.contentParagraph?.nativeElement);

    }

    ngAfterContentChecked() {
      console.log('ngAfterContentChecked');
    }

    ngAfterViewInit() {
      console.log('ngAfterViewInit');
      console.log('heading---->', this.heading?.nativeElement.textContent);

    }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnInit(): void {
    console.log('heading---->', this.heading?.nativeElement.textContent);
    console.log('ContentParagraph---->', this.contentParagraph?.nativeElement.textContent);
  }

  ngOnDestroy() {
    console.log('destroy')
  }

}
