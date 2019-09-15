import { Action, createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './actions';

export interface State {
  ingredients: Ingredient[];
}

export const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatos', 10)]
};

const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient]
  })),
  on(ShoppingListActions.addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients]
  })),
  on(ShoppingListActions.updateIngredient, (state, { index, newIngredient }) => {
    const ingredient = state.ingredients[index];
    const updatedIngredient = { ...ingredient, ...newIngredient };
    const ingredients = [...state.ingredients];
    ingredients[index] = updatedIngredient;
    return { ...state, ingredients };
  }),
  on(ShoppingListActions.deleteIngredient, (state, { index }) => {
    const ingredients = [...state.ingredients];
    ingredients.splice(index, 1);
    return { ...state, ingredients };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return shoppingListReducer(state, action);
}
