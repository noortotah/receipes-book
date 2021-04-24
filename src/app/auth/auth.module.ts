import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

const routes: Routes = [{path: '', component: AuthComponent}];
@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],

  exports: [RouterModule]
})
export class AuthModule {}
