import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeSelectedComponent } from '../no-recipe-selected/no-recipe-selected.component';
import { AuthGuard } from '../services/auth.guard';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecipesResolverService } from './../services/recipes-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: {RecipesResolverService},
    canActivate: [AuthGuard],
    children: [
        {path: '', component: NoRecipeSelectedComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailsComponent},
        {path: ':id/edit', component: RecipeEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
