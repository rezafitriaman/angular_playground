import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.scss']
})
export class DisplayDetailsComponent implements OnInit {
  content: string = 'Secret Password = tuna';
  show: boolean = false;
  buttonClicked: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
  }

  onShowPassword() {
    this.show = !this.show;
    this.buttonClicked.push( new Date().toLocaleTimeString())
  }

}
