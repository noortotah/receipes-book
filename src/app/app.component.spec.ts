import { Store, StoreModule } from '@ngrx/store';
import { RecipesResolverService } from './services/recipes-resolver.service';
import { TestBed } from '@angular/core/testing';
import { AppComponent, doublelength, isPositive, longShortString } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [

      ],
      providers: [
        RecipesResolverService,
        provideMockStore({ }),

      ]
    }).compileComponents();
  });



  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Noor Recipes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Noor Recipes');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('recipes-book app is running!');
  // });
});


describe('isPositive', () => {
  it('should return positive', () => {
    let result = isPositive(3);
    expect(result).toBeTrue();
    result = isPositive(0);
    expect(result).toBeFalse();
    result = isPositive(-3);
    expect(result).toBeFalse();
  })
});

describe('double length', () => {
  it('should return double string length', () => {
    let str = 'Noor';
    let result = doublelength(str);
    expect(result).toEqual(str.length * 2)

  })
});

describe('isLength less than 3 chars', () => {
  it('should return "No" TOO SHORT ', () => {
    let str = 'No';
    let result = longShortString(str);
    expect(result).toBe('TOO SHORT');
  })

  it('should return "Noo" OK', () => {
    let str = 'Noo';
    let result = longShortString(str);
    expect(result).toBe('OK');
  })

  it('should return "Noor" length is OK ', () => {
    let str = 'Noor';
    let result = longShortString(str);
    expect(result).toBe('OK');
  })
});
