import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoggingService} from "../logging.service";
import {AccountsService} from "../Accounts.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  //providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  //@Output() statusChanged = new EventEmitter<{id: number, name: string, newStatus: string}>();

  constructor(private loggingService : LoggingService, private accountService: AccountsService) {
    this.account = {name: '', status: ''};
    this.id = 0;
  }

  ngOnInit(): void {
  }

  onSetTo(status: string) {
    //this.statusChanged.emit({id: this.id, name: this.account.name, newStatus: status});
    this.accountService.updateStatus(this.id, status);
    //this.loggingService.LogStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }

}
