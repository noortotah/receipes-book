import { Ingredient } from './../../models/ingredient.model';
import { Action } from '@ngrx/store';

export enum ShoppingListActionTypes {
  ADD_INGREDIENT = '[Shopping List] Add Ingredient',
  ADD_INGREDIENTS = '[Shopping List] Add Ingredients',
  UPDATE_INGREDIENT = '[Shopping List] Update Ingredient',
  DELETE_INGREDIENT = '[Shopping List] Delete Ingredient',
  INGREDIENT_SELECTED = '[Shopping List] Ingredient Selected',
  CLEAR_SELECTED_INGREDIENT = '[Shopping List] Clear Selected Ingredient'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENT;

  constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListActionTypes.UPDATE_INGREDIENT;

  constructor(public payload: {id: string, ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActionTypes.DELETE_INGREDIENT;

  constructor(public id: string){}
}

export class IngredientSelectedToEdit implements Action {
  readonly type = ShoppingListActionTypes.INGREDIENT_SELECTED;

  constructor(public ingredient: Ingredient){}
}

export class ClearEdittedIngredient implements Action {
  readonly type = ShoppingListActionTypes.CLEAR_SELECTED_INGREDIENT;
}

export type ShoppingListActions = AddIngredient
                | AddIngredients
                | UpdateIngredient
                | DeleteIngredient
                | IngredientSelectedToEdit
                | ClearEdittedIngredient;
