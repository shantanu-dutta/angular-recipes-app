import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg'),
  ];

  private recipeSelected = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] { return this.recipes.slice(); }

  getSelectedRecipe() { return this.recipeSelected.asObservable(); }

  selectRecipe(recipe: Recipe): void { this.recipeSelected.emit(recipe); }
}