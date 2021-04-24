import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthGuard implements CanActivate {
  constructor( // private authService: AuthService,
              private store: Store<AppState>,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
        : boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
  {
    // return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(
        user => {
          const isAuth = !!user;
          if (!isAuth) {
            return this.router.createUrlTree(['/auth']);
          }
          return true;
        }
      ));
  }

}
