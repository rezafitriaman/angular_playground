import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  show: boolean;
  //@Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
    this.show = false;
    this.recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredients: []
    }
    this.id = 0;
  }

  ngOnInit(): void {
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];

      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  sendToShoppingList(ingredient: Ingredient[]) {
    this.recipeService.getIngredientForShoppingList(ingredient);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
      //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
