import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/Shopping-list.service';

@Injectable()
export class RecipeService {
  private recipesChanged = new Subject<Recipe[]>();
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

  constructor(private slService: ShoppingListService) { }

  getRecipes = (): Recipe[] => this.recipes.slice();

  getRecipe = (index: number): Recipe => Object.assign({}, this.recipes[index]);

  RecipesChanged = (): Observable<Recipe[]> => this.recipesChanged.asObservable();

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.AddIngredients(ingredients);
  }

  AddRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  UpdateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  DeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}