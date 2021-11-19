import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {UsersService} from "../users.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss'],
})
export class ActiveUsersComponent implements OnInit {
  @Input() users: Array<string>;
  counterToInactive: number;
  //@Output() userSetToInactive = new EventEmitter<number>();
  constructor(private usersService: UsersService) {
    this.users = [];
    this.counterToInactive = 1;
  }

  ngOnInit(): void {
    this.users = this.usersService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.usersService.actionActiveUsers.emit(this.counterToInactive++)
    this.usersService.onSetToInactive(id);
    //this.userSetToInactive.emit(id);
  }

}
