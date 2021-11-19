import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  activeUsers:Array<string> = ['Max', 'Anna'];
  inactiveUsers:Array<string> = ['Chris', 'Menu'];
  actionActiveUsers: EventEmitter<any> = new EventEmitter();
  actionInactiveUsers: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  onSetToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
  }

  onSetToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
  }
}
