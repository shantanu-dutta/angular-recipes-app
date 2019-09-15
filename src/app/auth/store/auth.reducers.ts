import { Action, createReducer } from '@ngrx/store';

export interface State {
  token: string;
  autheticated: boolean;
}

const initialState: State = {
  token: null,
  autheticated: false
};

const authReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
