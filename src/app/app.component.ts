import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyByae3mHbbnmxl-PeWOCC2pdhkUNMi4Ks0",
      authDomain: "ng-recipe-book-e6186.firebaseapp.com",
    });
  }
}
