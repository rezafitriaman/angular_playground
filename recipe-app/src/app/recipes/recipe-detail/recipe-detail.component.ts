import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipeService} from "../recipe.service";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  show: boolean;
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) {
    this.show = false;
    this.recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredient: []
    }
  }


  ngOnInit(): void {
  }

  sendToShoppingList(ingredient: Ingredient[]) {
    this.recipeService.getIngredientForShoppingList(ingredient);
  }

}
