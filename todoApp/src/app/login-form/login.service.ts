import {EventEmitter, Injectable} from '@angular/core';
import {UrlTree} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: boolean;
  loggedInInfo: EventEmitter<boolean>;

  constructor() {
    this.loggedIn = false; // false
    this.loggedInInfo = new EventEmitter<boolean>();
  }

  isAuthenticated(): Promise<boolean | UrlTree>  {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 800)
    })

    return promise as Promise<boolean | UrlTree>;
  }

  onLogin() {
    this.loggedIn = true;
    this.loggedInInfo.emit(this.loggedIn);
  }

  onLogout() {
    this.loggedIn = false;
    this.loggedInInfo.emit(this.loggedIn);
  }
}
