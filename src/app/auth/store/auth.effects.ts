import { AuthService } from './../../services/auth.service';
import { AuthActionTypes, LoginStart, AuthenticateSucess, AuthenticateFail, SignupStart, Logout, AutoLogout } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap, mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

export interface AuthDataResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const AuthenticationSuccessHandler = responseData => {
  const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
  return new AuthenticateSucess(
      new User(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        expirationDate
      )
  );
};
const AuthenticationFailureHandler = errorResponse => {
  let errorMessage = 'An error has occured';
  if (errorResponse.error && errorResponse.error.error ) {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = ' This user doesn\'t exist';
        break;
      default:
        errorMessage = 'An error has occured';

        break;
    }
  }
  // new observable
  return of( new AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_START),
    switchMap(
      (authData: SignupStart) => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
        return this.httpClient.post<AuthDataResponse>(url,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
              }
          ).pipe(
              map(
                AuthenticationSuccessHandler
              ),
              catchError(AuthenticationFailureHandler),
          );
      }
    )
  );
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_START),
    switchMap( (authData: LoginStart) => {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
      return this.httpClient.post<AuthDataResponse>(
        url + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(
          AuthenticationSuccessHandler
        ),
        catchError(AuthenticationFailureHandler)
      );
    })

  );

  @Effect({dispatch: false}) // Important for preventing invinite loop
  authSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.AUTHENTICATE_SUCCESS),
    tap( (AuthSuccessData: AuthenticateSucess) => {
      console.log(AuthSuccessData.user.tokenExpirationDate);
      this.authService.autoLogoutTimer( new Date(AuthSuccessData.user.tokenExpirationDate).getTime() - new Date().getTime()  );
      this.router.navigate(['/']);
      localStorage.setItem('userData', JSON.stringify(AuthSuccessData.user));
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap( () => {
      console.log('effect auth Logout');

      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActionTypes.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      return userData;
    }),
    map( userData => {


      console.log('inside auto Login');
      console.log(JSON.parse(localStorage.getItem('userData')));
      console.log('userData', userData);

      if (!userData){
        return new Logout();
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        console.log('inside auto Login 2');
        return new AuthenticateSucess(loadedUser);

      }
      return new Logout();

    })

  );



  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private authService: AuthService) {}

}
