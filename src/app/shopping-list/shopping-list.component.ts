import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './Shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  selectedIndex: number;
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.getIngredients();
    this.slService.IngredientsChanged().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
    this.slService.GetEditing().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (index: number) => (this.selectedIndex = index)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getIngredients() { this.ingredients = this.slService.GetIngredients(); }

  onEditItem(index: number) {
    this.slService.SetEditing(index);
  }

}
