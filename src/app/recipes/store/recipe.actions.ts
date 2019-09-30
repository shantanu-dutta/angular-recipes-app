import { createAction, props } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export enum RecipeActionTypes {
  AddRecipe = '[Recipes] Add Recipe',
  UpdateRecipe = '[Recipes] Update Recipe',
  DeleteRecipe = '[Recipes] Delete Recipe',
  SetRecipes = '[Recipes] Set Recipes'
}

export const addRecipe = createAction(RecipeActionTypes.AddRecipe, props<{ recipe: Recipe }>());
export const updateRecipe = createAction(
  RecipeActionTypes.UpdateRecipe,
  props<{ index: number; updatedRecipe: Recipe }>()
);
export const deleteRecipe = createAction(RecipeActionTypes.DeleteRecipe, props<{ index: number }>());
export const setRecipes = createAction(RecipeActionTypes.SetRecipes, props<{ recipes: Recipe[] }>());
