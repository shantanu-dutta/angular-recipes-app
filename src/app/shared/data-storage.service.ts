import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { of } from 'rxjs';

@Injectable()
export class DataStorageService {
  private storeUrl = 'https://ng-recipe-book-e6186.firebaseio.com';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  GetRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.storeUrl}/recipes.json`).pipe(
      map(recipes => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
    );
  }

  StoreRecipes() {
    return this.httpClient.put<Recipe[]>(`${this.storeUrl}/recipes.json`, this.recipeService.GetRecipes());
  }
}
