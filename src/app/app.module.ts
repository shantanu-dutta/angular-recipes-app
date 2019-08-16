import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from "./auth/auth.service";
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/Shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    SharedModule,
    ShoppingListModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    DataStorageService,
    RecipeService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
