import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { AppComponent } from './app.component';

import * as fromShoppingList from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ShoppingListModule,
    StoreModule.forRoot({ shoppingList: fromShoppingList.reducer })
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
