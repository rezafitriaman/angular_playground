import {Injectable, OnInit} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  startedEditing: Subject<number>;
  ingredientAdd: Subject<Ingredient[]>;

  constructor() {
    this.startedEditing = new Subject<number>();
    this.ingredientAdd = new Subject<Ingredient[]>();
  }

  ngOnInit() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index]
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

  updateIngredient(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientAdd.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdd.next(this.ingredients.slice());
  }
}
