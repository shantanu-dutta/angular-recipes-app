import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => authState.authenticated)
    );
  }
}
