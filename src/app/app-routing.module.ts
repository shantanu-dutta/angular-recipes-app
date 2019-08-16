import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full', },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule),
  },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }