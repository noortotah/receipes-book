import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Recipe } from './../../models/recipe.model';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FetchRecipes, RecipesActionTypes, AddRecipe, UpdateRecipe, LoadRecipes } from './recipes.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

const handleError = () =>  {
  return of( { type: 'Error'});
};

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActionTypes.FETCH_RECIPES),

    switchMap( (recipeActionData: FetchRecipes) => {
      console.log('inside effect fetchRecipes');
      const url = 'https://recipebook-fb130.firebaseio.com/recipes.json';
      return this.httpClient.get<Recipe[]>(url)
                            .pipe(
                              map (
                                recipes => {
                                  console.log('effect fetch')
                                  if (recipes && !recipes.length){
                                    return recipes;
                                  }

                                  return recipes.map(
                                    recipe => {
                                      return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                                    }
                                  );
                                }
                              ),
                              map(
                                recipes => {
                                  return new LoadRecipes(recipes);
                                }
                              )
                            );

        // );
    })
  );

  @Effect({dispatch: false})
  addRecipe = this.actions$.pipe(
    ofType(RecipesActionTypes.ADD_RECIPE),
    switchMap(
      (recipeActionData: AddRecipe) => {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        const url = 'https://recipebook-fb130.firebaseio.com/recipes.json';

        console.log(typeof recipeActionData.recipe);
        return this.httpClient.post< {[key: string]: Recipe} >(
            url,
            recipeActionData.recipe,
            { headers }
            );
      }
    ),

  );

  @Effect({dispatch: false})
  recipesChanged = this.actions$.pipe(
    ofType( RecipesActionTypes.ADD_RECIPE,
            RecipesActionTypes.DELETE_RECIPE
          ),
    tap( () => {
        console.log('navigate to ');
        this.router.navigate(['../'], {relativeTo: this.activedRoute});
    })
  );

  @Effect({dispatch: false})
  recipesUpdateSuccess = this.actions$.pipe(
    ofType(RecipesActionTypes.UPDATE_RECIPE),
    tap( (recipeData: UpdateRecipe) => {
        this.router.navigate(['/recipes', recipeData.payload.id]);
    })
  );


  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private activedRoute: ActivatedRoute) {}

}
