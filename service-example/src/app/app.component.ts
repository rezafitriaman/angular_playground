import {Component, OnInit} from '@angular/core';
import {AccountsService} from "./Accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  accounts: {name:string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }

  /*  onStatusChanged(updatedInfo: {id: number, name: string, newStatus: string}) {

    }

    onAccountAdded(newAccount: {name: string, status: string}) {
      this.accounts.push(newAccount);
    }*/
}
