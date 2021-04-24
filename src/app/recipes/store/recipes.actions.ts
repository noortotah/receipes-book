import { Recipe } from './../../models/recipe.model';
import { Action } from '@ngrx/store';

export enum RecipesActionTypes {
  LOAD_RECIPES = '[Recipes] Load Recipess',
  FETCH_RECIPES = '[Recipes] Fetch Recipess',
  ADD_RECIPE = '[Recipes] Add Recipe',
  UPDATE_RECIPE = '[Recipes] Update Recipe',
  DELETE_RECIPE = '[Recipes] Delete Recipe'


}

export class LoadRecipes implements Action {
  readonly type = RecipesActionTypes.LOAD_RECIPES;
  constructor(public recipes: Recipe[]){}
}

export class FetchRecipes implements Action {
  readonly type = RecipesActionTypes.FETCH_RECIPES;

  constructor(){}
}

export class AddRecipe implements Action {
  readonly type = RecipesActionTypes.ADD_RECIPE;

  constructor(public recipe: Recipe){}
}

export class UpdateRecipe implements Action {
  readonly type = RecipesActionTypes.UPDATE_RECIPE;

  constructor(public payload: {id: string, recipe: Recipe}){}
}

export class DeleteRecipe implements Action {
  readonly type = RecipesActionTypes.DELETE_RECIPE;

  constructor(public id: string){}
}


export type RecipesActions =    LoadRecipes
                              | FetchRecipes
                              | AddRecipe
                              | UpdateRecipe
                              | DeleteRecipe;
