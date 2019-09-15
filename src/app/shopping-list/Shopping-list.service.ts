import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/actions';

@Injectable()
export class ShoppingListService {
  private ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];
  private startedEditing = new Subject<number>();

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

  GetIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  GetShoppingListState(): Observable<{ ingredients: Ingredient[] }> {
    return this.store.select('shoppingList');
  }

  IngredientsChanged(): Observable<Ingredient[]> {
    return this.ingredientsChanged.asObservable();
  }

  AddIngredient(ingredient: Ingredient) {
    this.store.dispatch(ShoppingListActions.addIngredient({ ingredient }));
  }

  AddIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients }));
  }

  UpdateIngredient(index: number, newIngredient: Ingredient) {
    this.store.dispatch(ShoppingListActions.updateIngredient({ index, newIngredient }));
  }

  DeleteIngredient(index: number) {
    this.store.dispatch(ShoppingListActions.deleteIngredient({ index }));
  }

  GetEditing(): Observable<number> {
    return this.startedEditing.asObservable();
  }

  SetEditing(index: number) {
    this.startedEditing.next(index);
  }
}
