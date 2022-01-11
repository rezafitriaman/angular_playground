import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {RecipeService} from "../recipes/recipe.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientAdd: Subject<Ingredient[]>

  constructor() {
    this.ingredientAdd = new Subject<Ingredient[]>();
  }

  ngOnInit() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  ingredientExist(exist: number, ingredient: Ingredient) {
    if (exist >= 0) {
      let newItem = new Ingredient(ingredient.name, this.ingredients[exist].amount + ingredient.amount)
      this.ingredients.splice(exist,1, newItem);
    }else {
      this.ingredients.push(ingredient);
    }
  }

  ingredientAdded(ingredient: Ingredient) {
    console.log('ingredientAdded')
    const exist = this.ingredients.findIndex( (key) => key.name === ingredient.name);
    this.ingredientExist(exist, ingredient);
    this.ingredientAdd.next(this.ingredients.slice());
  }

  ingredientFromRecipe(ingredients: Ingredient[]) {
    console.log('ingredientFromRecipe')
    ingredients.forEach((ingredient)=> {
      const exist = this.ingredients.findIndex( (key) => ingredient.name === key.name);
      this.ingredientExist(exist, ingredient);
    })

    //this.ingredientAdd.emit(this.ingredients.slice());
  }
}
