import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss']
})
export class InactiveUsersComponent implements OnInit {
  @Input() users: Array<string>;
  @Output() userToActive = new EventEmitter<number>();
  constructor() {
    this.users = [];
  }

  ngOnInit(): void {
  }

  onSetToActive(id: number) {
    this.userToActive.emit(id);
  }
}
