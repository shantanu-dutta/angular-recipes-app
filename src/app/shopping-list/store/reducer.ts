import { Action, createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingListActions from './actions';

export interface State {
  ingredients: Ingredient[];
}

export const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatos', 10)]
};

const shoppingListReducer = createReducer(
  initialState,
  on(shoppingListActions.addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient]
  })),
  on(shoppingListActions.addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients]
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shoppingListReducer(state, action);
}
