import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({
    providedIn: 'root'
})
 export class RecipeResolverService implements Resolve  <Recipe[]> {
   constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {} 

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     console.log('resolve', this.dataStorageService.fetchRecipes())
     const recipe = this.recipeService.getRecipes() 
     if(recipe.length === 0) {
       this.dataStorageService.fetchRecipes().subscribe(recipes => {
         this.recipeService.setRecipes(recipes);
       });
        return this.dataStorageService.fetchRecipes()
    } else {
      return recipe;
    }
  }

}