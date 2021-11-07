import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  oddArr: Array<number>;
  evenArr: Array<number>;
  test: string;

  constructor() {
    this.oddArr = [];
    this.evenArr = [];
    this.test = 'master reza';
  }

  incrementNumberAdded(event: number) {
    console.log(event);
    if(event % 2 === 0) {
      this.evenArr.push(event);
    }else {
      this.oddArr.push(event);
    }
    console.log(this.oddArr );
  }

  stopAdded(event: boolean) {
      if(event) {
        this.oddArr = [];
        this.evenArr = [];
      }
  }
}
