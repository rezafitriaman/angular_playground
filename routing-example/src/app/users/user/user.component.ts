import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
 // @Input('userTarget') user: {id: number, name: string};
  user: {id: number, name: string};
  paramsSubscriptions: Subscription;

  constructor(private route: ActivatedRoute) {
    this.user = {id: 0, name: 'unknown'}
    this.paramsSubscriptions = this.route.params.subscribe();
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      }

      this.paramsSubscriptions = this.route.params.subscribe((params: Params) => {
          this.user.id = params['id']
          this.user.name = params['name']
        }
      )
  }

  ngOnDestroy() {
    this.paramsSubscriptions.unsubscribe();
  }

}
