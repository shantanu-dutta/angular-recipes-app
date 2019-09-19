import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { from } from 'rxjs';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    return from(firebase.auth().createUserWithEmailAndPassword(email, password));
  }

  signinUser(email: string, password: string) {
    return from(firebase.auth().signInWithEmailAndPassword(email, password));
  }

  getToken() {
    return from(firebase.auth().currentUser.getIdToken());
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(AuthActions.logout);
  }
}
