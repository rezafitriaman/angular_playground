import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]',
  //selector: '.app-servers',
  selector: 'app-servers',
  templateUrl: 'servers.component.html',
  //templateUrl: `<app-server></app-server><app-server></app-server>`,
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  btnText: string = 'add mastermind';
  serverName: string = 'TestServer';
  serverCreated = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }

  onMouseover() {
    this.btnText = 'yes master!'
  }

  onMouseout() {
    this.btnText = 'add mastermind!'
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    console.log(event);
    let targetElm = event.target as HTMLInputElement;
    this.serverName = targetElm.value;
  }
}
