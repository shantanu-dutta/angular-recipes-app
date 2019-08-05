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
