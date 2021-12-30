import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TodoService} from "../todo.service";
import {LoginService} from "../login-form/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() brand: string;
  loggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private router: Router,
              private loginService: LoginService) {
    this.loggedIn = false;
    this.brand = '';
  }

  ngOnInit(): void {
    this.loginService.loggedInInfo.subscribe((loggedInInfo: boolean) => {
      this.loggedIn = loggedInInfo;
    })
  }

  onLogout() {
    this.loginService.onLogout();
    this.router.navigate(['/login'])
  }

  onAddNewCategory() {
    console.log('onAddNewCategory')
  }
}
