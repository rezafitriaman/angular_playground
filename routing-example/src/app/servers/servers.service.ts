import { Injectable } from '@angular/core';
import {Server, ServerInfo} from "../shared/interface";

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  private servers: Server[] = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'online'
    }
  ];
  constructor() { }

  getServers() {
    return this.servers
  }

  getServer(id: number) {
    let server = this.servers.find((server)=>{
      return server.id === id
    });

    return server || {
      id: null,
      name: 'unknown',
      status: 'unknown'
    };
  }

  updateServer(id: number | null, serverInfo: ServerInfo) {
    let server = this.servers.find((server)=> {
      return server.id === id;
    })

    if(server) {
      server.name = serverInfo.name
      server.status = serverInfo.status;
    }

    console.log(this.servers)
  }
}
