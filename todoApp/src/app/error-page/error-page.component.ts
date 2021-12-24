import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  message:string
  constructor(private route: ActivatedRoute) {
    this.message = ''
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data['message']);
    this.message = this.route.snapshot.data['message'];
  }

}
