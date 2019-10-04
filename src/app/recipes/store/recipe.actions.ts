import { createAction, props } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  AddRecipe = '[Recipes] Add Recipe',
  UpdateRecipe = '[Recipes] Update Recipe',
  DeleteRecipe = '[Recipes] Delete Recipe',
  FetchRecipes = '[Recipes] Fetch Recipes',
  FetchRecipesSuccess = '[Recipes] Fetch Recipes Success',
  FetchRecipesFailure = '[Recipes] Fetch Recipes Failure',
  StoreRecipes = '[Recipes] Store Recipes'
}

export const addRecipe = createAction(RecipeActionTypes.AddRecipe, props<{ recipe: Recipe }>());
export const updateRecipe = createAction(
  RecipeActionTypes.UpdateRecipe,
  props<{ index: number; updatedRecipe: Recipe }>()
);
export const deleteRecipe = createAction(RecipeActionTypes.DeleteRecipe, props<{ index: number }>());
export const fetchRecipes = createAction(RecipeActionTypes.FetchRecipes);
export const fetchRecipesSuccess = createAction(RecipeActionTypes.FetchRecipesSuccess, props<{ recipes: Recipe[] }>());
export const fetchRecipesFailure = createAction(RecipeActionTypes.FetchRecipesFailure, props<{ error: string }>());
export const storeRecipes = createAction(RecipeActionTypes.StoreRecipes);
