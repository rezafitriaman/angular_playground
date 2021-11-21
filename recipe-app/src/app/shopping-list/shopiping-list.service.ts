import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientFromRecipeAdded: EventEmitter<Ingredient[]>
  ingredientAdd: EventEmitter<Ingredient[]>

  constructor() {
    this.ingredientFromRecipeAdded = new EventEmitter<Ingredient[]>();
    this.ingredientAdd = new EventEmitter<Ingredient[]>();
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
    const exist = this.ingredients.findIndex( (key) => key.name === ingredient.name);
    this.ingredientExist(exist, ingredient);
    this.ingredientAdd.emit(this.ingredients.slice());
  }

  ingredientFromRecipe(ingredients: Ingredient[]) {

    ingredients.forEach((ingredient)=> {
      const exist = this.ingredients.findIndex( (key) => ingredient.name === key.name);
      this.ingredientExist(exist, ingredient);
    })

    this.ingredientAdd.emit(this.ingredients.slice());
  }
}
