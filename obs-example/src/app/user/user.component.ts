import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../user.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.id = 0;

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    })
  }

  onActivated() {
    this.userService.activatedItem.next(true);
  }
  ngOnDestroy() {

  }
}
