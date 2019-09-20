import { Action, createReducer } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const recipesFeatureKey = 'recipes';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

const recipesReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}
