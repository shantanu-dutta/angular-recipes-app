import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../Shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  @ViewChild('f', { static: false }) slForm: NgForm;
  editMode = false;
  editeItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.GetEditing().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (index: number) => {
        if (index < 0) {
          return;
        }
        this.editeItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.GetIngredient(this.editeItemIndex);
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount,
        });
      }
    );
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
    this.editMode ? this.slService.UpdateIngredient(this.editeItemIndex, newIngredient) : this.slService.AddIngredient(newIngredient);
    this.onClear();
  }

  onDelete() {
    this.slService.DeleteIngredient(this.editeItemIndex);
    this.onClear();
  }

  onClear() {
    this.resetForm();
    this.editMode = false;
    this.slService.SetEditing(-1);
  }
}
