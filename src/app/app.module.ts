import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthService } from "./auth/auth.service";
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/Shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    SharedModule,
  ],
  providers: [AuthService, AuthGuardService, DataStorageService, RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
