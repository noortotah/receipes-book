import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.select('auth').pipe(take(1), map(
      authState => {
        return authState.user;
      }
    ), exhaustMap(
      (user) => {
        let authorizedReq = req;
        if (user){
          authorizedReq = req.clone( { params:  new HttpParams({...req.params}).append('auth', user.token) });
        }

        return next.handle(authorizedReq);
      }
    ));

    // return this.authService.user.pipe(take(1), exhaustMap(
    //   user => {
    //     console.log(user);
    //     console.log(req);
    //     let authorizedReq = req;
    //     if (user){
    //       authorizedReq = req.clone( { params:  new HttpParams({...req.params}).append('auth', user.token) });
    //       console.log(authorizedReq);
    //     }

    //     return next.handle(authorizedReq);
    //   }
    // ));

  }
}
