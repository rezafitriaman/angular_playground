import { Component, OnInit } from '@angular/core';
import {Server} from "../../shared/interface";
import {ServersService} from "../servers.service";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit {
  server: Server;
  serverName: string;
  serverStatus: string;
  constructor(private serversService: ServersService) {
    this.server = {
      id: null,
      name: 'unknown',
      status: 'unknown'
    }
    this.serverName = this.server.name
    this.serverStatus = this.server.status
  }

  ngOnInit(): void {
    this.server = this.serversService.getServer(2);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    console.log('update server')
    console.log(this.serverStatus)
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus})
  }


}
