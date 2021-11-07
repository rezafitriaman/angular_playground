import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss']
})
export class EvenComponent implements OnInit {
  @Input() testFromParent: string;
  @Input() evenFromParent: number;
  constructor() {
    this.testFromParent = '';
    this.evenFromParent = 0;
  }

  ngOnInit(): void {
  }

}
