import { createAction, props } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  AddRecipe = '[Recipes] Add Recipe',
  UpdateRecipe = '[Recipes] Update Recipe',
  DeleteRecipe = '[Recipes] Delete Recipe',
  SetRecipes = '[Recipes] Set Recipes',
  FetchRecipes = '[Recipes] Fetch Recipes',
  FetchRecipesSuccess = '[Recipes] Fetch Recipes Success',
  FetchRecipesFailure = '[Recipes] Fetch Recipes Failure'
}

export const addRecipe = createAction(RecipeActionTypes.AddRecipe, props<{ recipe: Recipe }>());
export const updateRecipe = createAction(
  RecipeActionTypes.UpdateRecipe,
  props<{ index: number; updatedRecipe: Recipe }>()
);
export const deleteRecipe = createAction(RecipeActionTypes.DeleteRecipe, props<{ index: number }>());
export const setRecipes = createAction(RecipeActionTypes.SetRecipes, props<{ recipes: Recipe[] }>());
export const fetchRecipes = createAction(RecipeActionTypes.FetchRecipes);
export const fetchRecipesSuccess = createAction(RecipeActionTypes.FetchRecipesSuccess, props<{ recipes: Recipe[] }>());
export const fetchRecipesFailure = createAction(RecipeActionTypes.FetchRecipesFailure, props<{ error: string }>());
