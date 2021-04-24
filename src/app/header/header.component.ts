import { FetchRecipes } from './../recipes/store/recipes.actions';
import { Logout } from './../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { DataStorageService } from './../services/data-storage.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorage: DataStorageService,
              private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe(
    //   user => {
    //     this.isAuthenticated = !!user;
    //   }
    // );
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  logout(): void{
    // this.authService.logout();
    this.store.dispatch(
      new Logout()
    );
  }
  saveData(): void{
    this.dataStorage.storeRecipes();
  }

  fetchRecipes(): void {

    console.log('header fetch');
    this.store.dispatch( new FetchRecipes() );
  }
}
