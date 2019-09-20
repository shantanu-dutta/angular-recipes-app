import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { reducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    ShoppingListModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
