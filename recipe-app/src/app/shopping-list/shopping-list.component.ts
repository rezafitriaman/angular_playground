import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopiping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnInit(): void {
    this.shoppingListService.ingredientAdded.subscribe((newRecipe)=> {
      console.log('test');
      this.ingredients.push(newRecipe);
    })

  }

  /*onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }*/

}
