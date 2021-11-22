import { Component, OnInit } from '@angular/core';
import {Server} from "../shared/interface";
import {ServersService} from "./servers.service";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  public servers: Server[];
  constructor(private serversService: ServersService) {
    this.servers = [];
  }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

}
