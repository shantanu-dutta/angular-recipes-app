import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  private storeUrl = 'https://ng-recipe-book-e6186.firebaseio.com';

  constructor(private httpClient: HttpClient) {}

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

  StoreRecipes(recipes: Recipe[]) {
    return this.httpClient.put<Recipe[]>(`${this.storeUrl}/recipes.json`, recipes);
  }
}
