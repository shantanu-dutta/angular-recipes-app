import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(action => {
        return from(firebase.auth().createUserWithEmailAndPassword(action.username, action.password)).pipe(
          switchMap(_ => [AuthActions.signupSuccess, AuthActions.getToken]),
          catchError((error: HttpErrorResponse) => of(AuthActions.signupFailure({ error: error.message })))
        );
      })
    )
  );

  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getToken),
      switchMap(_ =>
        from(firebase.auth().currentUser.getIdToken()).pipe(
          map((token: string) => AuthActions.getTokenSuccess({ token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.getTokenFailure({ error: error.message })))
        )
      )
    )
  );
}
