import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  @Input() users: Array<string>;
  @Output() userSetToInactive = new EventEmitter<number>();
  constructor() {
    this.users = [];
  }

  ngOnInit(): void {
  }

  onSetToInactive(id: number) {
    this.userSetToInactive.emit(id);
  }

}
