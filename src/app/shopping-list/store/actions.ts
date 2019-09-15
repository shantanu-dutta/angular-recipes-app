import { createAction, props } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction('[Shopping List Page] Add Ingredient', props<{ ingredient: Ingredient }>());
export const addIngredients = createAction(
  '[Recipe Detail Page] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);
