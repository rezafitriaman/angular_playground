import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
    this.id = 0;
    this.editMode = false;
    this.recipeForm = new FormGroup({
      'name': new FormControl(null),
      'imagePath': new FormControl(null),
      'description': new FormControl(null),
      'recipeIngredients': new FormArray([])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    console.log(this.recipeForm.value.imagePath);
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient)=> {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount,
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }));
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit () {
    console.log(this.recipeForm.value)
/*    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'])*/
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    console.log(this.recipeForm);
    console.log(this.recipeForm.get('ingredients'));
    const ingredients: FormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

}
