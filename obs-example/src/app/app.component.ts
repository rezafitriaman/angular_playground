import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from "./user.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  activated: boolean
  subscribe: Subscription
  constructor(private userService: UserService) {
    this.activated = false;
    this.subscribe = new Observable().subscribe();
  }

  ngOnInit() {
    this.subscribe = this.userService.activatedItem.subscribe((data:boolean)=> {
      console.log(data)
      this.activated = data;
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }


}
