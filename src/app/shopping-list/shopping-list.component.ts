import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './Shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  selectedIndex: number;
  shoppingListState$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.getIngredients();
    this.slService
      .GetEditing()
      .pipe(takeUntil(this.destroy$))
      .subscribe((index: number) => (this.selectedIndex = index));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getIngredients() {
    this.shoppingListState$ = this.slService.GetShoppingListState();
  }

  onEditItem(index: number) {
    this.slService.SetEditing(index);
  }
}
