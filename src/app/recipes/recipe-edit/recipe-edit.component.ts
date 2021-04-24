import { UpdateRecipe, AddRecipe } from './../store/recipes.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from './../../models/recipe.model';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  editMode: boolean;
  recipeForm: FormGroup;
  newIngredient = new Ingredient('', 1);
  id: string;
  routerSub: Subscription;

  constructor(private activedRoute: ActivatedRoute,
              private router: Router,
              private recipesService: RecipeService,
              private store: Store<AppState>,
              private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      _id: [null],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
      ingredients : this.formBuilder.array([]),

    });
    this.routerSub = this.activedRoute.params.pipe(
      tap((params: Params) => {

        this.editMode = params.id != null;
        this.id = params.id;
      }),
      switchMap(() => {
        return this.store.select('recipes');
      }),
      map( recipeState => {
        return recipeState.recipes.find(recipe => {
          return recipe._id === this.id;
        });
      })
    ).subscribe(
      (recipe) => {
        if (this.editMode){
          this.initForm(recipe);
        }else{
          this.initForm();
        }
      }
    );
  }

  initForm(recipe?: Recipe): void{

    if (recipe !== undefined) {
      this.recipeForm.patchValue({
        _id: recipe._id,
        name: recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath,

        ingredients: [],
      });


      if (recipe.ingredients.length){
        recipe.ingredients.forEach( ingredient => {
            this.addIngredientToForm(ingredient);
          });
      }

    }
  }


  get ingredients(): FormArray {

    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredientToForm(element: Ingredient | {name: string, amount: number}): void{
    const control = this.formBuilder.group({
      name: [element.name, [Validators.required]],
      amount: [element.amount, [Validators.required]]
    });
    this.ingredients.push(control);
  }

  removeIngredientFromRecipe(index: number): void{
    this.ingredients.removeAt(index);
  }

  addNewIngredientToForm(): void{
    this.addIngredientToForm({  name: this.newIngredient.name,
                                amount: this.newIngredient.amount });
    this.newIngredient = new Ingredient('', 1);
  }



  back(): void{
    this.router.navigate(['../'], { relativeTo: this.activedRoute });
  }

  saveForm(): void{
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients,
      this.recipeForm.value._id
    );
    if (this.editMode){
      this.store.dispatch(
        new UpdateRecipe({
          id: this.recipeForm.controls._id.value,
          recipe
        })
      );
    }else{
      this.store.dispatch(
        new AddRecipe(recipe)
      );
    }

    // this.back();
  }



}
