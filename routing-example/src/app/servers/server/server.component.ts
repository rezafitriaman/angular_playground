import { Component, OnInit } from '@angular/core';
import {Server} from "../../shared/interface";
import {ServersService} from "../servers.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: Server;
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
    this.server = {
      id: null,
      name: 'unknown',
      status: 'unknown'
    }
  }

  ngOnInit(): void {
    this.server = this.serversService.getServer(+this.route.snapshot.params.id || 1);
    this.route.params.subscribe((params: Params)=> {
      this.server = this.serversService.getServer(+params.id || 1)
    })
  }

  onEdit() {
    //this.router.navigate(['/servers', this.server.id, 'edit'], { queryParams: {allowEdit: 0}, fragment: 'loading'})
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
