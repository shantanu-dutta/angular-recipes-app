import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export class ShoppingListService {
  private ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  GetIngredients(): Ingredient[] { return this.ingredients.slice(); }

  IngredientsChanged(): Observable<Ingredient[]> { return this.ingredientsChanged.asObservable(); }

  AddIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}