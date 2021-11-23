import { Component, OnInit } from '@angular/core';
import {Server} from "../shared/interface";
import {ServersService} from "./servers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  public servers: Server[];
  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) {
    this.servers = [];
  }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }
  onReload() {
    this.router.navigate(['/servers'], {relativeTo: this.route})
  }

}
