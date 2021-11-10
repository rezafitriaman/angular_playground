import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor() {
    this.recipe = {
      name: '',
      description: '',
      imagePath: ''
    }
  }

  ngOnInit(): void {
  }

  onSelected(name: string, description: string, imagePath: string) {
    console.log('onSelected');
    this.recipeSelected.emit({
      name: name,
      description: description,
      imagePath: imagePath
    });
  }
}
