import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> = [];
  subscription: Subscription;
  /*  recipes: Array<Recipe> = [
    new Recipe('A test recipe','This is a simply a test','https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches.jpg'),
    new Recipe('A nice recipe','This is a simply a test','https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches.jpg'),
  ];*/

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorage: DataStorageService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe((recipes: Array<Recipe>)=> {
      this.recipes = recipes;
    })
    this.dataStorage.fetchRecipes()
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*  onRecipeSelected(recipe: Recipe) {
      console.log('onRecipeSelected');
      this.recipeWasSelected.emit(recipe);
    }*/
}
