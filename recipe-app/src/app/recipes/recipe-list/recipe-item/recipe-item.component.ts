import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";
import {Ingredient} from "../../../shared/ingredient.model";


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;
  @Input() index:number;
  constructor(private recipeService: RecipeService) {
    this.recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredient: []
    }
    this.index = 0;
  }

  ngOnInit(): void {
  }

/*  onSelected(name: string, description: string, imagePath: string, ingredient: Array<Ingredient>) {
    this.recipeService.recipeWasSelected.emit({
      name: name,
      description: description,
      imagePath: imagePath,
      ingredient: ingredient
    });
    this.recipeSelected.emit({
      name: name,
      description: description,
      imagePath: imagePath
    });
  }*/
}
