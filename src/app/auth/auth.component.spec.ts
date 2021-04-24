import { State } from './store/auth.reducer';

import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './../services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthService,
        provideMockStore({
          initialState: {
            user: null,
            authError: null,
            isLoading: false
          },
          selectors: [
            // { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
            // { selector: selectVisibleBooks, value: ['Book 1'] },
          ],
        }),

      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
