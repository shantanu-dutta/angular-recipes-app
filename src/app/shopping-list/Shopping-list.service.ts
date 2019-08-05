import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private startedEditing = new Subject<number>();

  GetIngredients(): Ingredient[] { return this.ingredients.slice(); }

  GetIngredient(index: number): Ingredient { return this.ingredients[index]; }

  IngredientsChanged(): Observable<Ingredient[]> { return this.ingredientsChanged.asObservable(); }

  AddIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  AddIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  UpdateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  DeleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  GetEditing(): Observable<number> { return this.startedEditing.asObservable(); }

  SetEditing(index: number): void { this.startedEditing.next(index); }
}