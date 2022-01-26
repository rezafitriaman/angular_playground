import {EventEmitter, Injectable} from '@angular/core';
import {UrlTree} from "@angular/router";
import {Subject} from "rxjs";
import {LoginOrJoinForm} from "../models/Todo";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  loggedInInfo: Subject<boolean>;

  constructor() {
    this.loggedIn = false; // false
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
