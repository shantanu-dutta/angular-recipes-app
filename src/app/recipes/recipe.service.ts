import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/Shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'Super tasty Schnitzel - just awesome!',
      'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]
    ),
  ];
  private recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) { }

  getRecipes(): Recipe[] { return this.recipes.slice(); }

  getSelectedRecipe() { return this.recipeSelected.asObservable(); }

  selectRecipe(recipe: Recipe): void { this.recipeSelected.emit(recipe); }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.AddIngredients(ingredients);
  }
}