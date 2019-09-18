import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(_ => {
        this.store.dispatch(AuthActions.signup);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => this.store.dispatch(AuthActions.getTokenSuccess({ token })));
      })
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.store.dispatch(AuthActions.signin);
        this.router.navigate(['/']);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => this.store.dispatch(AuthActions.getTokenSuccess({ token })));
      })
      .catch(console.log);
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(AuthActions.logout);
  }
}
