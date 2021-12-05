import { Component, OnInit } from '@angular/core';
import {Server} from "../../shared/interface";
import {ServersService} from "../servers.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "./can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server;
  serverName: string;
  serverStatus: string;
  allowEdit: boolean;
  changesSaved: boolean

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
    this.server = {
      id: null,
      name: 'unknown',
      status: 'unknown'
    }
    this.serverName = this.server.name
    this.serverStatus = this.server.status
    this.allowEdit = false;
    this.changesSaved = false;
  }

  ngOnInit(): void {
    //to retrieve data from the url
    console.log('a', this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    console.log(this.route.snapshot.params.id);
    //this.route.queryParams.subscribe()
    //this.route.fragment.subscribe()
    this.route.queryParams.subscribe((queryParams: Params)=> {
      console.log('queryParams', queryParams)
      this.allowEdit = (queryParams['allowEdit'] === '1');
    })
    this.server = this.serversService.getServer(+this.route.snapshot.params.id || 1);
    this.route.params.subscribe((params: Params)=> {
      this.server = this.serversService.getServer(+params.id || 1);
    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    console.log('update server')
    console.log(this.serverStatus)
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus})
    this.changesSaved = true;
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }
    console.log('his.serverName', this.serverName )
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ) {
      return confirm('Do you want ti descard the changes?')
    }else {
      return true;
    }

  }
}
