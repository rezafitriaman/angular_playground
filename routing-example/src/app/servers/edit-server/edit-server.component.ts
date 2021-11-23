import { Component, OnInit } from '@angular/core';
import {Server} from "../../shared/interface";
import {ServersService} from "../servers.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit {
  server: Server;
  serverName: string;
  serverStatus: string;
  constructor(private serversService: ServersService, private route: ActivatedRoute) {
    this.server = {
      id: null,
      name: 'unknown',
      status: 'unknown'
    }
    this.serverName = this.server.name
    this.serverStatus = this.server.status
  }

  ngOnInit(): void {
    //to retrieve data from the url
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    //this.route.queryParams.subscribe()
    //this.route.fragment.subscribe()

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
