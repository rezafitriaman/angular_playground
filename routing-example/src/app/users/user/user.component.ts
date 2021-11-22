import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input('userTarget') user: {id: number, name: string};

  constructor() {
    this.user = {id: 0, name: 'unknown'}
  }

  ngOnInit(): void {
  }

}
