import { IngredientSelectedToEdit } from './store/shopping-list.actions';
import { Ingredient } from './../models/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { IngredientService } from '../services/ingredient.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  //Observable<{ingredients: Ingredient[]}>;
  private ingredientsSubscription: Subscription;

  constructor(private ingredientService: IngredientService,
              private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientsSubscription = this.store.select('shoppingList').subscribe(shoppingListData => {
      this.ingredients = shoppingListData.ingredients;
    });

    // this.ingredients = this.ingredientService.getIngredients();
    // this.ingredientsSubscription = this.ingredientService.ingredientAdded.subscribe(() => {
    //   this.ingredients = this.ingredientService.getIngredients();
    //   console.log(this.ingredients);
    // });
  }

  editItem(index: number): void{
    // this.ingredientService.selectItemForEditting(index);
    console.log(this.ingredients);
    this.store.dispatch(
      new IngredientSelectedToEdit(this.ingredients[index])
    );
  }

}
