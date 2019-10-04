import { Action, createReducer, on } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export const recipesFeatureKey = 'recipes';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  recipes: [],
  loading: true,
  error: null
};

const recipesReducer = createReducer(
  initialState,
  on(RecipeActions.addRecipe, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe]
  })),
  on(RecipeActions.updateRecipe, (state, { index, updatedRecipe }) => {
    const oldRecipe = state.recipes[index];
    const modifiedRecipe = { ...oldRecipe, ...updatedRecipe };
    const recipes = [...state.recipes];
    recipes[index] = modifiedRecipe;
    return { ...state, recipes };
  }),
  on(RecipeActions.deleteRecipe, (state, { index }) => {
    const oldRecipes = [...state.recipes];
    const newRecipes = oldRecipes.splice(index, 1);
    return { ...state, recipes: newRecipes };
  }),
  on(RecipeActions.setRecipes, (state, { recipes }) => ({ ...state, recipes: [...recipes] })),
  on(RecipeActions.fetchRecipes, state => ({ ...state, loading: true, error: null })),
  on(RecipeActions.fetchRecipesSuccess, (state, { recipes }) => ({ ...state, recipes: [...recipes], loading: false })),
  on(RecipeActions.fetchRecipesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}
