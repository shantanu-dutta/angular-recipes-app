import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { ShoppingListService } from './Shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  shoppingListState$: Observable<fromShoppingList.State>;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.getIngredients();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getIngredients() {
    this.shoppingListState$ = this.slService.GetShoppingListState();
  }

  onEditItem(index: number) {
    this.slService.StartEdit(index);
  }
}
