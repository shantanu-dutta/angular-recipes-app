import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { AppComponent } from './app.component';

import { AuthService } from "./auth/auth.service";
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/Shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
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
