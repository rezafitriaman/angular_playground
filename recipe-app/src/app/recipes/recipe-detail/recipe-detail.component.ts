import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  show: boolean;
  @Input() recipe: Recipe;
  constructor() {
    this.show = false;
    this.recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredient: []
    }
  }


  ngOnInit(): void {
  }

  sendToShoppingList(ingredient: Ingredient[]) {

  }

}
