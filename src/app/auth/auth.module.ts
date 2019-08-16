import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingmodule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AuthRoutingmodule,
    CommonModule,
    FormsModule,
  ],
})
export class AuthModule { }