import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopiping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef | undefined;
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingName = this.nameInputRef?.nativeElement.value;
    const ingIngredient = this.amountInputRef?.nativeElement.value;
    console.log(ingName)
    if(ingName.trim() === '' || ingIngredient.trim() === '') {
        return;
    }
    const newIngredient = new Ingredient(ingName,ingIngredient);

    this.shoppingListService.ingredientAdded.emit(newIngredient);
    //this.ingredientAdded.emit(newIngredient);
  }
}
