import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Easy-List';
  //@ViewChild(HeaderComponent, {static: false}) hello: HeaderComponent | undefined;
  //@ViewChild('myElm', {static: false}) myElm: ElementRef | undefined;
  //@ViewChildren(HeaderComponent) myValue: QueryList<HeaderComponent> | undefined
  ngAfterViewInit() {
    //console.log("Hello ", this.myValue?.toArray());
  }
}
