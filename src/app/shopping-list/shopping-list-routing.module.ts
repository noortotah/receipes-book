import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthGuard } from '../services/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes  = [
  {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
