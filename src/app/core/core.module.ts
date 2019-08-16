import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ]
})
export class CoreModule { }