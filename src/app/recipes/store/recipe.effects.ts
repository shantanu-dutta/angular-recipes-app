import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';

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

  storeRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.pipe(select(fromRecipe.selectRecipes))),
        switchMap(([_, recipes]) => this.storageService.StoreRecipes(recipes))
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private storageService: DataStorageService,
    private store: Store<fromRecipe.FeatureState>
  ) {}
}
