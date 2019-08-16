import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/Shopping-list.service';

@Injectable()
export class RecipeService {
  private recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }
  
  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.AddIngredients(ingredients);
  }
  
  AddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  DeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  GetRecipes = (): Recipe[] => this.recipes.slice();
  
  GetRecipe = (index: number): Recipe => Object.assign({}, this.recipes[index]);

  SetRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  RecipesChanged = (): Observable<Recipe[]> => this.recipesChanged.asObservable();

  UpdateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}