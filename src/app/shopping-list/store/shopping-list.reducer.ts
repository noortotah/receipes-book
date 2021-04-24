import { ShoppingListActionTypes, ShoppingListActions } from './shopping-list.actions';
import { Ingredient } from './../../models/ingredient.model';


export const shoppingListFeatureKey = 'shoppingList';

export interface State {
  ingredients: Ingredient[];
  selectItemForEditting: Ingredient;
  selectItemForEdittingIndex: number;
}


export const initialState: State = {
  ingredients : [
    new Ingredient('Apple', 5, '02ce311a-a57f-4092-8360-819bfd23b935'),
    new Ingredient('Tomato', 10, 'c57da397-988f-4007-8310-936da4dcbb5a'),
  ],
  selectItemForEditting: null,
  selectItemForEdittingIndex: -1
};


function findIngredientIndexById(id: string, state: State): number{
  const findById = ingredient => ingredient._id === id;
  return state.ingredients.findIndex( findById );
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions): State {
  switch (action.type) {
    case ShoppingListActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActionTypes.UPDATE_INGREDIENT:
      const updateIndex = findIngredientIndexById(action.payload.id, state);
      if (updateIndex !== -1) {
        const editedIngredient = {
          ...state.ingredients[updateIndex],
          ...action.payload.ingredient
        };
        const newIngredients = [...state.ingredients];
        newIngredients[updateIndex] = editedIngredient;

        return {
          ...state,
          ingredients: newIngredients
        };
      }
      return state;

    case ShoppingListActionTypes.DELETE_INGREDIENT:
      const deleteIndex = findIngredientIndexById(action.id, state);
      if (deleteIndex !== -1) {
        return {
          ...state,
          ingredients: state.ingredients.filter( (element, elIndex) => {
            return elIndex !== deleteIndex;
          })
        };
      }
      return state;

    case ShoppingListActionTypes.INGREDIENT_SELECTED:
      return {
        ...state,
        selectItemForEditting: { ...action.ingredient},
        selectItemForEdittingIndex: findIngredientIndexById(action.ingredient._id, state)
      };

    case ShoppingListActionTypes.CLEAR_SELECTED_INGREDIENT:
      return {
        ...state,
        selectItemForEditting: null,
        selectItemForEdittingIndex: -1
      };

    default:
      return state;
  }
}
