import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  Signup = '[Auth] Signup',
  Signin = '[Auth] Signin',
  AuthSuccess = '[Auth] Auth Success',
  AuthFailure = '[Auth] Auth Failure',
  Logout = '[Auth] Logout',
  GetToken = '[Auth] Get Token'
}

export const signup = createAction(AuthActionTypes.Signup, props<{ email: string; password: string }>());
export const signin = createAction(AuthActionTypes.Signin, props<{ email: string; password: string }>());
export const authSuccess = createAction(AuthActionTypes.AuthSuccess, props<{ token: string }>());
export const authFailure = createAction(AuthActionTypes.AuthFailure, props<{ error: string }>());
export const logout = createAction(AuthActionTypes.Logout);
export const getToken = createAction(AuthActionTypes.GetToken);
