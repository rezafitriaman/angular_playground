import { Component } from '@angular/core';
type Servers = {instanceType: string, name: string, status: string, started: Date};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipes-example';
  requestReceives = new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve('Master');
    },3000)
  })
  servers = [
    {
      instanceType: 'medium',
      name: 'Aproduction Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Zdevelopment Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Ctesting Environment Server',
      status: 'critical',
      started: new Date(15, 1, 2017)
    }
  ];
  getStatusClasses(server: Servers) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    }
  }
}
