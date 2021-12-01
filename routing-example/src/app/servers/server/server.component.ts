import { Component, OnInit } from '@angular/core';
import {Server} from "../../shared/interface";
import {ServersService} from "../servers.service";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: Server;
  constructor(private serversService: ServersService) {
    this.server = {
      id: null,
      name: 'unknown',
      status: 'unknown'
    }
  }

  ngOnInit(): void {
    this.server = this.serversService.getServer(1);
  }

}
