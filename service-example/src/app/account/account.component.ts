import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, name: string, newStatus: string}>();

  constructor() {
    this.account = {name: '', status: ''};
    this.id = 0;
  }

  ngOnInit(): void {
  }

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, name: this.account.name, newStatus: status});
    console.log('A server status changed, new status: ' + status);
  }

}
