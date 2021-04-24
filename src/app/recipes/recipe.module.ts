import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeEditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
  ]
})
export class RecipeModule { }
