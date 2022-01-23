import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopiping-list.service";
import {Form, FormControl, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
type FormValue = {
  name: string,
  amount: number
}

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //@ViewChild('nameInput', {static: false}) nameInputRef: ElementRef | undefined;
  //@ViewChild('amountInput', {static: false}) amountInputRef: ElementRef | undefined;
  @ViewChild('f', {static: false}) slForm: NgForm | undefined;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService, ) {
    this.subscription = new Subscription();
    this.editedItemIndex = 0;
    this.editedItem = {
      name: '',
      amount: 0
    }
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number)=> {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm?.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const formValue: FormValue = form.value;

    if(formValue.name.trim() === '' || formValue.amount.toString().trim() === '') {
        return;
    }

    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else {
      this.shoppingListService.ingredientAdded(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear () {
    this.slForm?.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
