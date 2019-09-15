import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  autheticated: boolean;
}

const initialState: State = {
  token: null,
  autheticated: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.signup, AuthActions.signin, state => ({ ...state, autheticated: true })),
  on(AuthActions.logout, state => ({ ...state, token: null, autheticated: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
