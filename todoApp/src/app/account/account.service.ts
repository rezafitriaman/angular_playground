import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {UrlTree} from "@angular/router";
import {LoginOrJoinForm} from "../models/Todo";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loggedIn: boolean;
  loggedInInfo: Subject<boolean>;
  constructor() {
    this.loggedIn = true; // false
    this.loggedInInfo = new Subject<boolean>();
  }

  isAuthenticated(): Promise<boolean | UrlTree>  {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 800)
    })

    return promise as Promise<boolean | UrlTree>;
  }

  onLogin(formValue: LoginOrJoinForm) {
    console.log('submit', (formValue));
    this.loggedIn = true;
    this.loggedInInfo.next(this.loggedIn);
  }

  onLogout() {
    this.loggedIn = false;
    this.loggedInInfo.next(this.loggedIn);
  }
}
