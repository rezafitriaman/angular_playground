import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import  {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopiping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  //public recipeWasSelected: Subject<Recipe>;
  //public sendRecipeToShoppingList: Subject<Ingredient[]>
  public recipesChanged: Subject<Array<Recipe>>;
  private recipes: Array<Recipe> = [
    new Recipe('Tonkatsu',
      'Tonkatsu, or pork cutlet, is a Japanese dish of pork filet that is breaded with panko breadcrumbs and deep-fried. It is traditionally served with a dark, savory tonkatsu sauce and shredded green cabbage.',
      'https://www.thespruceeats.com/thmb/UYVEJszIvbLikahIhsRTrqal0Rk=/3000x2000/filters:no_upscale()/tonkatsu-recipe-japanese-breaded-and-deep-fried-pork-2031274-step-13-2352bcbd1d9d4c59917f91ff608c3d87.jpg',
      [
        new Ingredient('Apples', 1) ,
        new Ingredient('boneless pork chops\n', 4),
        new Ingredient('Kosher salt, to taste', 1),
        new Ingredient('Freshly ground black pepper, to taste', 1)]),
        new Recipe('Ramen',
      'Zin in een uitgebreide kooksessie? Deze noedelsoep die wat wegheeft van tonkotsu ramen is alles wat je wil!',
      'https://static.ah.nl/static/recepten/img_124772_1024x748_JPG.jpg',
      [
        new Ingredient('venkelknol', 1),
        new Ingredient('ui', 1),
        new Ingredient('knoflook', 5)]),
  ];

  constructor(private shoppingListService: ShoppingListService) {
    this.recipesChanged = new Subject<Array<Recipe>>();
    //this.sendRecipeToShoppingList = new Subject<Ingredient[]>();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getIngredientForShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.ingredientFromRecipe(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
