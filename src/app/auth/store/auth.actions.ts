import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  Signin = '[Auth] Signin',
  Logout = '[Auth] Logout',
  SetToken = '[Auth] Set Token'
}

export const signup = createAction(AuthActionTypes.Signup, props<{ username: string; password: string }>());
export const signupSuccess = createAction(AuthActionTypes.SignupSuccess);
export const signin = createAction(AuthActionTypes.Signin);
export const logout = createAction(AuthActionTypes.Logout);
export const setToken = createAction(AuthActionTypes.SetToken, props<{ token: string }>());
