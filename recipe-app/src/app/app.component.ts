import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';

import {Ingredient} from "./shared/ingredient.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //loadedFeature = 'recipes';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin()    
  }

/*  onNavigate(feature: string) {

    this.loadedFeature = feature;
  }*/
}

