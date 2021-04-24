import { LoadRecipes } from './../recipes/store/recipes.actions';
import { AuthService } from './auth.service';
import { Recipe } from './../models/recipe.model';
import { Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://recipebook-fb130.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<AppState>) { }



  storeRecipes(): void {
    let recipes = null;
    this.store.select('recipes').pipe(
      tap(
        recipeState => {
          recipes = recipeState.recipes;
        }
      )
    );

    this.http.put(this.url, recipes).subscribe( response => {console.log(response); });
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return throwError(error || 'Server error');
  }

}
