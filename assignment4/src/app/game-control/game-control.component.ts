import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() stopEvent = new EventEmitter<boolean>();
  incrementNumber: number;
  interval: number;

  constructor() {
    this.incrementNumber = 0;
    this.interval = 0;
  }

  ngOnInit(): void {
  }

  onStartBtn() {
    console.log('start');
    this.interval = setInterval(() => {
      this.incrementNumber = this.incrementNumber + 1;

      this.newItemEvent.emit(this.incrementNumber);
    }, 1000);
  }

  onStopBtn() {
    clearInterval(this.interval);
    this.incrementNumber = 0;
    this.stopEvent.emit(true)
  }

}
