import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterActiveToInActive: number;
  private counterInActiveToActive: number;
  constructor() {
    this.counterActiveToInActive = 0;
    this.counterInActiveToActive = 0;
  }

  onCounterActiveToInActive() {
    this.counterActiveToInActive++
    console.log('active to inActive', this.counterActiveToInActive);
  }
  onCounterInActiveToActive() {
    this.counterInActiveToActive++
    console.log('inActive to Active', this.counterInActiveToActive);
  }
}
