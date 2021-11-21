import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Array<Recipe> = [];
  /*  recipes: Array<Recipe> = [
    new Recipe('A test recipe','This is a simply a test','https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches.jpg'),
    new Recipe('A nice recipe','This is a simply a test','https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches.jpg'),
  ];*/

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

  }

/*  onRecipeSelected(recipe: Recipe) {
    console.log('onRecipeSelected');
    this.recipeWasSelected.emit(recipe);
  }*/
}
