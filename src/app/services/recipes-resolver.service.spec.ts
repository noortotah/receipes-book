import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesResolverService } from './recipes-resolver.service';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('RecipesResolverService', () => {
  let service: RecipesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot()
      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(RecipesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
