import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
/*  recipeNav: boolean;
  shoppingListNav: boolean;*/
  loadedFeature = 'recipes';

  constructor() {
/*    this.recipeNav = true;
    this.shoppingListNav = false;*/
  }
  onNavigate(feature: string) {
    console.log(event);
    this.loadedFeature = feature;
  }
/*  recipeHasClicked(event: boolean) {
    if(event) {
      console.log('recipeHasClicked');
      this.recipeNav = true;
      this.shoppingListNav = false;
    }
  }
  shoppingListClicked(event: boolean) {
      if(event) {
        console.log('shoppingListClicked');
        this.recipeNav = false;
        this.shoppingListNav = true;
      }
  }*/
}

