import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  show = false;
  recipes = true;
  shoppingList = false;
/*  @Output() recipeClicked = new EventEmitter<boolean>()
  @Output() shoppingListClicked = new EventEmitter<boolean>()*/
  @Output() featureSelected = new EventEmitter<string>()

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
    if(feature === 'recipes') {
      this.recipes = true;
      this.shoppingList = false;
      this.show = false;
    }else if(feature === 'shoppingList') {
      this.recipes = false;
      this.shoppingList = true;
      this.show = false;
    }else {
      this.show = true;
      this.recipes = false;
      this.shoppingList = false;
    }
  }
/*  onRecipe() {
    this.shoppingList = false;
    this.recipe = true;
    this.show = false;
    this.recipeClicked.emit(true);
  }

  onShoppingList() {
    this.shoppingList = true;
    this.recipe = false;
    this.show = false;
    this.shoppingListClicked.emit(true);
  }

  onManage() {
    console.log('onManage');
    this.shoppingList = false;
    this.recipe = false;
    this.show = true;
  }*/
}
