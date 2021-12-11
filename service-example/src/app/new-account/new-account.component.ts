import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoggingService} from "../logging.service";
import {AccountsService} from "../Accounts.service";


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  //providers: [LoggingService]
})
export class NewAccountComponent implements OnInit {
  //@Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService, private accountService: AccountsService) {

  }

  ngOnInit(): void {
    this.accountService.statusUpdated.subscribe((status: string)=> alert(status));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    //this.loggingService.LogStatusChange(accountStatus);

  }

}
