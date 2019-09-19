import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(action =>
        this.authService.signupUser(action.email, action.password).pipe(
          switchMap(_ => [AuthActions.signupSuccess, AuthActions.getToken]),
          catchError((error: HttpErrorResponse) => of(AuthActions.signupFailure({ error: error.message })))
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      switchMap(action =>
        this.authService.signinUser(action.email, action.password).pipe(
          switchMap(_ => [AuthActions.signinSuccess, AuthActions.getToken]),
          catchError((error: HttpErrorResponse) => of(AuthActions.signinFailure({ error: error.message })))
        )
      )
    )
  );

  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getToken),
      switchMap(_ =>
        this.authService.getToken().pipe(
          map((token: string) => AuthActions.getTokenSuccess({ token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.getTokenFailure({ error: error.message })))
        )
      )
    )
  );
}
