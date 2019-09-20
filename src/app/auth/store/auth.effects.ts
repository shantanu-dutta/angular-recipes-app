import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(action =>
        this.authService.signupUser(action.email, action.password).pipe(
          map(_ => AuthActions.getToken()),
          catchError((error: HttpErrorResponse) => of(AuthActions.authFailure({ error: error.message })))
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      switchMap(action =>
        this.authService.signinUser(action.email, action.password).pipe(
          map(_ => AuthActions.getToken()),
          catchError((error: HttpErrorResponse) => of(AuthActions.authFailure({ error: error.message })))
        )
      )
    )
  );

  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getToken),
      switchMap(_ =>
        this.authService.getToken().pipe(
          map((token: string) => AuthActions.authSuccess({ token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.authFailure({ error: error.message })))
        )
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
