import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientAdded: EventEmitter<Ingredient>

  constructor() {
    this.ingredientAdded = new EventEmitter<Ingredient>();
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
