import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myInterval: Subscription;

  constructor() {
    this.myInterval = interval().subscribe();
  }

  ngOnInit(): void {
    this.myInterval = interval(1000).subscribe(count => {
      console.log('ega ', count);
    })
  }

  ngOnDestroy() {
    this.myInterval.unsubscribe()
  }

}
