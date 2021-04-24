import { RecipesActionTypes, LoadRecipes, RecipesActions, UpdateRecipe } from './recipes.actions';
import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';


export const recipesFeatureKey = 'recipes';

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: []
};


function findRecipeIndexById(id: string, state: State): number{
  const findById = recipe => recipe._id === id;
  return state.recipes.findIndex( findById );
}

export function recipeReducer(state = initialState, action: RecipesActions): State {
  switch (action.type) {
    case RecipesActionTypes.LOAD_RECIPES:
      console.log('load recipes');
      console.log(action.recipes);
      return {
        ...state,
        recipes: [ ...Object.keys(action.recipes).map(key => ({
          id: key,
          ...action.recipes[key]
      }))]
      };
    case RecipesActionTypes.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };
    case RecipesActionTypes.UPDATE_RECIPE:
      const updateIndex = findRecipeIndexById(action.payload.id, state);
      if (updateIndex !== -1) {
        const editedRecipe = {
          ...state.recipes[updateIndex],
          ...action.payload.recipe
        };
        const newRecipes = [...state.recipes];
        newRecipes[updateIndex] = editedRecipe;
        console.log(newRecipes);
        return {
          ...state,
          recipes: newRecipes
        };
      }
      return state;

    case RecipesActionTypes.DELETE_RECIPE:
      const deleteIndex = findRecipeIndexById(action.id, state);
      if (deleteIndex !== -1) {
        return {
          ...state,
          recipes: state.recipes.filter( (element, elIndex) => {
            return elIndex !== deleteIndex;
          })
        };
      }
      return state;
    default:
      return state;
  }
}
