import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  show = false;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {
  }

  onSaveData() {
      this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
  /*recipes = true;
  shoppingList = false;*/

/*  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/
}
