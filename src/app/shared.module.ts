import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/elements/dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    DropdownDirective,
    ErrorPageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ]
})
export class SharedModule { }
