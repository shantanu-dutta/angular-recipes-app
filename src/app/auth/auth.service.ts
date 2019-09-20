import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor() {}

  signupUser(email: string, password: string) {
    return from(firebase.auth().createUserWithEmailAndPassword(email, password));
  }

  signinUser(email: string, password: string) {
    return from(firebase.auth().signInWithEmailAndPassword(email, password));
  }

  getToken() {
    return from(firebase.auth().currentUser.getIdToken());
  }
}
