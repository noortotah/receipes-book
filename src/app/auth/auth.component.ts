import { LoginStart, SignupStart } from './store/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit , OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authSub: Subscription;


  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe(
      authState => {
        console.log(authState);
        this.isLoading = authState.isLoading;
        this.error = authState.authError;
      }
    );
  }
  switchMode(): void{
    this.isLoginMode = ! this.isLoginMode;
  }
  submitLoginForm(form: NgForm): void{
    // let authObservable: Observable<AppState>;
    if (form.invalid) { return; }

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObservable = this.authService.login(form.value.email, form.value.password);

      this.store.dispatch(
        new LoginStart({
          email: form.value.email,
          password: form.value.password
        })
      );

    }else{

      this.store.dispatch(
        new SignupStart({
          email: form.value.email,
          password: form.value.password
        })
      );
      // authObservable = this.authService.signup(form.value.email, form.value.password);
    }

    // authObservable = this.store.select('auth').subscribe(
    //     authState => {
    //       this.isLoading = false;
    //     });
    // authObservable.subscribe(
    //   response => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }
  // ngOnInit(): void {
  // }




}
