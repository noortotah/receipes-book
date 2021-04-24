import { Recipe } from './../../models/recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipesSub: Subscription;
  constructor(
              // private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  // selectItem(id:number){
  //   this.router.navigate([ id ], { relativeTo:this.activatedRoute});
  // }
  ngOnInit(): void {

    this.recipesSub = this.store.select('recipes').subscribe(
      recipeState => {
        this.recipes = recipeState.recipes;
      }
    );

  }
  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }

}
