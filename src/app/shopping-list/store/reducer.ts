import { Action, createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatos', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
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
  on(ShoppingListActions.updateIngredient, (state, { newIngredient }) => {
    const index = state.editedIngredientIndex;
    const ingredient = state.ingredients[index];
    const updatedIngredient = { ...ingredient, ...newIngredient };
    const ingredients = [...state.ingredients];
    ingredients[index] = updatedIngredient;
    return { ...state, ingredients, editedIngredient: null, editedIngredientIndex: -1 };
  }),
  on(ShoppingListActions.deleteIngredient, state => {
    const index = state.editedIngredientIndex;
    const ingredients = [...state.ingredients];
    ingredients.splice(index, 1);
    return { ...state, ingredients, editedIngredient: null, editedIngredientIndex: -1 };
  }),
  on(ShoppingListActions.startEdit, (state, { index }) => {
    const editedIngredient = { ...state.ingredients[index] };
    return { ...state, editedIngredientIndex: index, editedIngredient };
  }),
  on(ShoppingListActions.stopEdit, state => ({ ...state, editedIngredientIndex: -1, editedIngredient: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return shoppingListReducer(state, action);
}
