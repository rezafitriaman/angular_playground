import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myInterval: Subscription;
  customInterval: Subscription;

  constructor() {
    this.myInterval = interval().subscribe();
    this.customInterval = interval().subscribe();
  }

  ngOnInit(): void {
    this.myInterval = interval(1000).subscribe(count => {
      //console.log('ega ', count);
    })

    const customIntervalObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if(count === 6) {
          observer.complete();
        }
        if(count === 8) {
          observer.error(new Error('count is 3'));
        }
      }, 1000)
    });

    this.customInterval = customIntervalObservable.pipe(filter((data:number) => data > 0),map((data: number)=> {
      return 'Round ' + (data + 1);
    })).subscribe((data: number) => {
      console.log('custom', data);
    }, (error: Error) => {
      console.log('error', error.message);
    }, () => {
      console.log('completed')
    });
  }

  ngOnDestroy() {
    this.myInterval.unsubscribe()
    this.customInterval.unsubscribe()
  }

}
