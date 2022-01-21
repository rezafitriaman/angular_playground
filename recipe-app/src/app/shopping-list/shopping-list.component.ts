import {Component, Input, OnInit} from '@angular/core';
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
    this.ingredients = [];
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientAdd.subscribe((ingredients)=> {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
