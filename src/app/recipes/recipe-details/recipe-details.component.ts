import { DeleteRecipe } from './../store/recipes.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { Ingredient } from './../../models/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from './../../models/recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AddIngredients } from './../../shopping-list/store/shopping-list.actions';
import { State } from 'src/app/shopping-list/store/shopping-list.reducer';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  id: string;
  constructor(private recipeService: RecipeService,
              // private ingredientService: IngredientService,
              private store: Store<AppState>,
              private activatedRouter: ActivatedRoute,
              private router: Router) {

   }

  ngOnInit(): void {
   this.activatedRouter.params.pipe(
     tap( (params: Params) => {
      this.id = params.id;
     }),
     switchMap( () => {
      return this.store.select('recipes');
     }),
     map(recipeState => {
      return recipeState.recipes.find( (recipe) => {
          return recipe._id === this.id;
      });
     })
   ).subscribe( recipe => {
      this.recipe = recipe;
   });
  }

  addIngredientsToShoppingList(): void{
    this.store.dispatch(
      new AddIngredients(this.recipe.ingredients)
    );
      // this.ingredientService.addListOfIngredients(this.recipe.ingredients);
  }

  deleteRecipe(): void{
    this.store.dispatch(
      new DeleteRecipe(this.recipe._id)
    );
    // this.recipeService.deleteRecipe(this.recipe._id);
    // this.router.navigate(['../'], {relativeTo: this.activatedRouter});
  }

}
