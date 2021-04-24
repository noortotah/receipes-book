import { User } from './../../models/user.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_START = '[Auth] Login Start',
  AUTO_LOGIN = '[Auth] Auto Login',
  AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success',
  AUTHENTICATE_FAIL = '[Auth] Authenticate Fail',
  SIGNUP_START  = '[Auth] Signup Start',
  LOGOUT = '[Auth] Logout',
  AUTO_LOGOUT = '[Auth] Auto Logout'


}

export class AuthenticateSucess implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public user: User) {}
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LOGIN_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AUTO_LOGIN;
}

export class AuthenticateFail implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_FAIL;

  constructor(public errorMessage: string) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionTypes.SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class AutoLogout implements Action {
  readonly type = AuthActionTypes.AUTO_LOGOUT;

  constructor(public expirationTime: number){}
}


export type AuthActions = AuthenticateSucess
                        | LoginStart
                        | AutoLogin
                        | AuthenticateFail
                        | SignupStart
                        | Logout
                        | AutoLogout;
