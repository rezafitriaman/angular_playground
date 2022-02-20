import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TodoService} from "../todo.service";
import {Observable, Subscription} from "rxjs";
import {AccountService} from "../account/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() brand: string;
  loggedIn: boolean;
  subscription: Subscription

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router,
              private loginService: AccountService) {
    this.loggedIn = false; // false
    this.brand = '';
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.loginService.loggedInInfo.subscribe((loggedInInfo: boolean) => {
      this.loggedIn = loggedInInfo;
    })
  }

  onLogout() {
    this.loginService.onLogout();
    this.router.navigate(['/account/login'])
  }

  onAddNewCategory() {
    console.log('onAddNewCategory')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
