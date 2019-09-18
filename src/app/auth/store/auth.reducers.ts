import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
  error: string;
}

const initialState: State = {
  token: null,
  authenticated: false,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signupSuccess, AuthActions.signin, state => ({ ...state, authenticated: true })),
  on(AuthActions.getTokenSuccess, (state, { token }) => ({ ...state, token, authenticated: true })),
  on(AuthActions.logout, state => ({ ...state, token: null, authenticated: false })),
  on(AuthActions.signupFailure, (state, { error }) => ({ ...state, token: null, authenticated: false, error })),
  on(AuthActions.getTokenFailure, (state, { error }) => ({ ...state, token: null, authenticated: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
