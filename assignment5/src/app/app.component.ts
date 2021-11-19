import { Component } from '@angular/core';
import {UsersService} from "./users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private usersService: UsersService) {
    this.usersService.actionInactiveUsers.subscribe((counter)=> {
      console.log('actionInactiveUsers', counter);
    });

    this.usersService.actionActiveUsers.subscribe((counter)=> {
      console.log('actionActiveUsers', counter);
    });
  }
}
