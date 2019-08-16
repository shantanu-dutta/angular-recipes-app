import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private storeUrl = 'https://ng-recipe-book-e6186.firebaseio.com';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) { }

  GetRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>(`${this.storeUrl}/recipes.json?auth=${token}`)
      .pipe(
        map(recipes => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(
      this.recipeService.SetRecipes,
      console.log
    );
  }

  StoreRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put<Recipe[]>(`${this.storeUrl}/recipes.json?auth=${token}`, this.recipeService.GetRecipes());
  }
}
