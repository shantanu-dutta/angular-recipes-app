import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as RecipeActions from './recipe.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RecipeEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap(_ =>
        this.storageService.GetRecipes().pipe(
          map(recipes => RecipeActions.fetchRecipesSuccess({ recipes })),
          catchError((error: HttpErrorResponse) => of(RecipeActions.fetchRecipesFailure({ error: error.message })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private storageService: DataStorageService) {}
}
