import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onAddNewCategory() {
    console.log('onAddNewCategory')
  }
}
