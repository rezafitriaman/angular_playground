import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedItem: Subject<boolean>;
  constructor() {
    this.activatedItem = new Subject<boolean>();
  }
}
