import { Actions, ofType } from '@ngrx/effects';
import { FetchRecipes, RecipesActionTypes } from './../recipes/store/recipes.actions';
import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<void>{

  constructor(private dataStorage: DataStorageService,
              private store: Store<AppState>,
              private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {

    this.store.dispatch( new FetchRecipes() );

  }
}
