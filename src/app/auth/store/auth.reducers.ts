import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signup, AuthActions.signin, state => ({ ...state, authenticated: true })),
  on(AuthActions.logout, state => ({ ...state, token: null, authenticated: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
