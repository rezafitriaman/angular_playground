import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http:HttpClient, private recipeService: RecipeService, private authService: AuthService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-course-recipe-book-9fefb-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response=> {
        console.log(response);
      })
  }
  
  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     console.log('user exhaustMap', user)
    //     return this.http.get<Recipe[]>('https://ng-course-recipe-book-9fefb-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',{
    //       params: new HttpParams().set('auth', !user?.token ? false : user.token )
    //     })
    //   }),
    //   map(recipe => {
    //     return recipe.map(recipe => {
    //      // console.log(recipe)
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       }
    //     })
    //   })
    // )
      
    return this.http
      .get<Recipe[]>('https://ng-course-recipe-book-9fefb-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipe => {
        return recipe.map(recipe => {
          console.log(recipe)
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        })
      }))
  }
}
