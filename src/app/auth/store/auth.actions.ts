import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  SignupFailure = '[Auth] Signup Failure',
  Signin = '[Auth] Signin',
  SigninSuccess = '[Auth] Signin Success',
  SigninFailure = '[Auth] Signin Failure',
  Logout = '[Auth] Logout',
  GetToken = '[Auth] Get Token',
  GetTokenSuccess = '[Auth] Get Token Success',
  GetTokenFailure = '[Auth] Get Token Failure'
}

export const signup = createAction(AuthActionTypes.Signup, props<{ email: string; password: string }>());
export const signupSuccess = createAction(AuthActionTypes.SignupSuccess);
export const signupFailure = createAction(AuthActionTypes.SignupFailure, props<{ error: string }>());
export const signin = createAction(AuthActionTypes.Signin, props<{ email: string; password: string }>());
export const signinSuccess = createAction(AuthActionTypes.SigninSuccess);
export const signinFailure = createAction(AuthActionTypes.SigninFailure, props<{ error: string }>());
export const logout = createAction(AuthActionTypes.Logout);
export const getToken = createAction(AuthActionTypes.GetToken);
export const getTokenSuccess = createAction(AuthActionTypes.GetTokenSuccess, props<{ token: string }>());
export const getTokenFailure = createAction(AuthActionTypes.GetTokenFailure, props<{ error: string }>());
