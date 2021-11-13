import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4, 6];
  numbers = this.oddNumbers.concat(this.evenNumbers);
  onlyOdd = false;
  prop: any;
  value = 590;
}
