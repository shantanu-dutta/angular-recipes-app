import { createAction, props } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export enum ShoppingListActionTypes {
  AddIngredient = '[Shopping List] Add Ingredient',
  AddIngredients = '[Shopping List] Add Ingredients',
  UpdateIngredient = '[Shopping List] Update Ingredient',
  DeleteIngredient = '[Shopping List] Delete Ingredient',
  StartEdit = '[Shopping List] Start Edit',
  StopEdit = '[Shopping List] Stop Edit'
}

export const addIngredient = createAction(ShoppingListActionTypes.AddIngredient, props<{ ingredient: Ingredient }>());
export const addIngredients = createAction(
  ShoppingListActionTypes.AddIngredients,
  props<{ ingredients: Ingredient[] }>()
);
export const updateIngredient = createAction(
  ShoppingListActionTypes.UpdateIngredient,
  props<{ newIngredient: Ingredient }>()
);
export const deleteIngredient = createAction(ShoppingListActionTypes.DeleteIngredient);
export const startEdit = createAction(ShoppingListActionTypes.StartEdit, props<{ index: number }>());
export const stopEdit = createAction(ShoppingListActionTypes.StopEdit);
