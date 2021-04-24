import { Ingredient } from './../models/ingredient.model';
import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredientAdded = new Subject<void>();
  selectedItemForEdit = new Subject<Ingredient>();
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5, '02ce311a-a57f-4092-8360-819bfd23b935'),
    new Ingredient('Tomato', 10, 'c57da397-988f-4007-8310-936da4dcbb5a'),

  ];
  constructor() { }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number): void{
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientAdded.next();
  }

  editIngredient(edittedIngredient: Ingredient): void{
    const findById = ingredient => ingredient._id === edittedIngredient._id;
    const index = this.ingredients.findIndex( findById );

    console.log(edittedIngredient);
    console.log(this.ingredients[index]);
    if ( index !== -1) {
      this.ingredients[index] = {...edittedIngredient};
      console.log('--------');
      console.log(this.ingredients[index]);
      console.log(this.ingredients);

      this.ingredientAdded.next();

    }

  }

  addListOfIngredients(ingredients: Ingredient[]): void{
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next();
  }

  selectItemForEditting(index: number): void{
    const ingredient = this.ingredients[index];
    this.selectedItemForEdit.next(ingredient);
  }

  deleteItemFromTheList(id: string): void{
    const findById = ingredient => ingredient._id === id;
    const index = this.ingredients.findIndex( findById );
    if (index !== -1){
      this.ingredients.splice(index, 1);
      this.ingredientAdded.next();
    }


  }
}
