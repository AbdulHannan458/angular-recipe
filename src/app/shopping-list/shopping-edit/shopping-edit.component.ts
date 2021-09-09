import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subsrciption: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editItem: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subsrciption = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editItem = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, form.value);
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() : void {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem() : void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subsrciption.unsubscribe();
  }

}
