import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from './../../models/user.model';



export const authFeatureKey = 'auth';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

export function AuthReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user : action.user,
        authError: null,
        isLoading: false
      };
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };
    case AuthActionTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.errorMessage,
        isLoading: false
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
