import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    this.id = 0;
    this.editMode = false;
    this.recipeForm = new FormGroup({
      'name': new FormControl(null),
      'imagePath': new FormControl(null),
      'description': new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log('id', this.id)
      console.log('this.editMode', this.editMode)
    })
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
    })
  }

  onSubmit () {
    console.log(this.recipeForm)
  }

}
