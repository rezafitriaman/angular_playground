import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService} from "../users.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss'],
})
export class InactiveUsersComponent implements OnInit {
  @Input() users: Array<string>;
  counterToActive: number;
  //@Output() userToActive = new EventEmitter<number>();
  constructor(private usersService: UsersService) {
    this.users = this.usersService.inactiveUsers;
    this.counterToActive = 1;
  }

  ngOnInit(): void {
  }

  onSetToActive(id: number) {
    this.usersService.actionInactiveUsers.emit(this.counterToActive++);
    this.usersService.onSetToActive(id);
    //this.userToActive.emit(id);
  }
}
