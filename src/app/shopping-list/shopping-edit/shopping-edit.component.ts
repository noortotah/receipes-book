import { AppState } from './../../store/app.reducer';
import { AddIngredient, UpdateIngredient, DeleteIngredient, ClearEdittedIngredient } from './../store/shopping-list.actions';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { IngredientService } from 'src/app/services/ingredient.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppinglistForm') shoppinglistForm: NgForm;
  subscription: Subscription;
  ingredient: Ingredient;
  editMode = false;

  constructor( //private ingredientService: IngredientService,
               private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.ingredient = new Ingredient('', null);
    this.subscription = this.store.select('shoppingList').subscribe(shoppingListData => {

        if (shoppingListData.selectItemForEdittingIndex !== -1){
          this.ingredient = {...shoppingListData.selectItemForEditting};
          this.editMode = true;
          console.log(this.ingredient);
        }
    });

  }

  addIngredient(): void{
    if (this.editMode){
      this.store.dispatch(
        new UpdateIngredient({
          id: this.ingredient._id,
          ingredient: new Ingredient(
              this.shoppinglistForm.value.name,
              this.shoppinglistForm.value.amount
            )
        })
      );
      this.editMode = false;
    }else{
      this.store.dispatch(
          new AddIngredient(
              new Ingredient(
                this.shoppinglistForm.value.name,
                this.shoppinglistForm.value.amount
              )
          )
      );
    }
    this.clearForm();
  }

  clearForm(): void{
    this.editMode = false;
    this.shoppinglistForm.reset();
    this.store.dispatch(
      new ClearEdittedIngredient()
    );
  }

  deleteItem(): void{
    this.store.dispatch(
      new DeleteIngredient(this.ingredient._id)
    );
    // this.ingredientService.deleteItemFromTheList(this.ingredient._id);
    this.clearForm();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
