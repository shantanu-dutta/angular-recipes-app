import { createAction, props } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction(
  '[Shopping List Service] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);
export const addIngredients = createAction(
  '[Shopping List Service] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);
export const updateIngredient = createAction(
  '[Shopping List Service] Update Ingredient',
  props<{ index: number; newIngredient: Ingredient }>()
);
export const deleteIngredient = createAction('[Shopping List Service] Delete Ingredient', props<{ index: number }>());
