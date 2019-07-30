import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './Shopping-list.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  destroy$ = new Subject();

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.getIngredients();
    this.slService.IngredientsChanged().pipe(
      takeUntil(this.destroy$)
    ).subscribe((ingredients: Ingredient[]) => (this.ingredients = ingredients));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getIngredients() { this.ingredients = this.slService.GetIngredients(); }

}
