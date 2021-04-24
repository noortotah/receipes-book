import { AuthService } from './services/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AutoLogin } from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Noor Recipes';
  constructor(private authService: AuthService,
              private store: Store<AppState>,
              @Inject(PLATFORM_ID) private plateformId){}

  ngOnInit(): void {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.plateformId)){
      this.store.dispatch( new AutoLogin() );
    }

  }




}

export function isPositive(n: number)  {
  return n > 0 ;
}


export function longShortString(str: string)  {
  return str.length >= 3 ? 'OK' : 'TOO SHORT';
}

export function doublelength(str: string)  {
  return str.length * 2;
}



