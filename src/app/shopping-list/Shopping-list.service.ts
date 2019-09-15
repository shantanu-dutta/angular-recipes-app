import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/actions';
import * as fromShoppingList from './store/reducer';

@Injectable()
export class ShoppingListService {
  private ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];
  private startedEditing = new Subject<number>();

  constructor(private store: Store<fromShoppingList.AppState>) {}

  GetIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  GetShoppingListState(): Observable<fromShoppingList.State> {
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

  UpdateIngredient(newIngredient: Ingredient) {
    this.store.dispatch(ShoppingListActions.updateIngredient({ newIngredient }));
  }

  DeleteIngredient() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
  }

  GetEditing(): Observable<number> {
    return this.startedEditing.asObservable();
  }

  StartEdit(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }
}
