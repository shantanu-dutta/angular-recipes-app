import * as firebase from 'firebase/app';
import 'firebase/auth';

export class AuthService {
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(console.log);
  }
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(console.log);
  }
}
