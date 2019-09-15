import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../Shopping-list.service';
import * as fromShoppingList from '../store/reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject();
  @ViewChild('f', { static: false }) slForm: NgForm;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngAfterViewInit() {
    this.slService
      .GetShoppingListState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((shoppingListState: fromShoppingList.State) => {
        if (shoppingListState.editedIngredientIndex < 0) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.editedItem = shoppingListState.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private resetForm() {
    this.slForm.reset();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editMode ? this.slService.UpdateIngredient(newIngredient) : this.slService.AddIngredient(newIngredient);
    this.onClear();
  }

  onDelete() {
    this.slService.DeleteIngredient();
    this.onClear();
  }

  onClear() {
    this.resetForm();
    this.editMode = false;
    this.slService.StartEdit(-1);
  }
}
