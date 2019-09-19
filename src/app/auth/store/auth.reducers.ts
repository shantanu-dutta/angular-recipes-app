import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  token: string | null;
  authenticated: boolean;
  error: string | null;
}

const initialState: State = {
  token: null,
  authenticated: false,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, { token }) => ({ ...state, token, authenticated: true, error: null })),
  on(AuthActions.authFailure, (state, { error }) => ({ ...state, token: null, authenticated: false, error })),
  on(AuthActions.logout, state => ({ ...state, token: null, authenticated: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
