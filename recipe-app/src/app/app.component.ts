import {Component, OnInit} from '@angular/core';

import {Ingredient} from "./shared/ingredient.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipes';

  constructor() {
  }

  ngOnInit() {
  }

  onNavigate(feature: string) {

    this.loadedFeature = feature;
  }
}

