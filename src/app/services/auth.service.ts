import { Logout, AuthenticateSucess } from './../auth/store/auth.actions';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { catchError, tap, exhaustMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';


// export interface AuthDataResponse {
//   kind: string;
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timer: NodeJS.Timeout;
  // user = new BehaviorSubject<User>(null);
  constructor(
              // private httpClient: HttpClient,
              // private router: Router,
              private store: Store<AppState>) { }

  // login(email: string, password: string): Observable<AuthDataResponse>{
  //   const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  //   return this.httpClient.post<AuthDataResponse>( url + environment.firebaseAPIKey,
  //                           {
  //                             email,
  //                             password,
  //                             returnSecureToken: true
  //                           }).pipe(catchError(this.handleError),
  //                           tap(responseData => {
  //                             this.handleUserAuthentication(responseData);
  //                           }));
  // }

  // signup(email: string, password: string): Observable<AuthDataResponse> {
  //   const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  //   return this.httpClient.post<AuthDataResponse>(url,
  //                       {
  //                         email,
  //                         password,
  //                         returnSecureToken: true
  //                       }
  //                   ).pipe(catchError(this.handleError),
  //                           tap(responseData => {
  //                             this.handleUserAuthentication(responseData);
  //                           }));
  // }

  // logout(): void{
  //   // this.user.next(null);
  //   // this.store.dispatch(new Logout());
  //   // this.router.navigate(['/auth']);
  //   // localStorage.removeItem('userData');
  // }


  // autoLogin(): void{
  //   const userData: {
  //     email: string,
  //     id: string,
  //     _token: string,
  //     _tokenExpirationDate: string
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData){
  //     return;
  //   }
  //   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

  //   if (loadedUser.token){
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(new AuthenticateSucess(loadedUser));
  //     this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() );
  //   }
  // }

  autoLogoutTimer(expirationTime: number): void{
    this.timer = setTimeout(() => {
      this.store.dispatch(new Logout());
    }, expirationTime);
  }

  clearLogoutTimer(): void{
    clearTimeout(this.timer);
  }

  // private handleUserAuthentication(responseData: AuthDataResponse): void{
  //   const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
  //   const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new AuthenticateSucess(user));


  //   this.autoLogout(+responseData.expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'An error has occured';
  //   if (errorRes.error && errorRes.error.error ) {
  //     switch (errorRes.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //         errorMessage = 'This email exists already';
  //         break;
  //       case 'INVALID_PASSWORD':
  //         errorMessage = 'The password is invalid or the user does not have a password';
  //         break;
  //       case 'EMAIL_NOT_FOUND':
  //         errorMessage = ' This user doesn\'t exist';
  //         break;
  //       default:
  //         errorMessage = 'An error has occured';

  //         break;
  //     }
  //   }

  //   return throwError(errorMessage);
  // }
}
