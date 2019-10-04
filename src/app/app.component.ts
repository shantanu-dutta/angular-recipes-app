import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import * as firebase from 'firebase/app';

import { Observable, merge } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setLoading();
    firebase.initializeApp({
      apiKey: 'AIzaSyByae3mHbbnmxl-PeWOCC2pdhkUNMi4Ks0',
      authDomain: 'ng-recipe-book-e6186.firebaseapp.com'
    });
  }

  private setLoading() {
    const navigationStart$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      mapTo(true)
    );
    const navigationEnd$ = this.router.events.pipe(
      filter(
        event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError
      ),
      mapTo(false)
    );
    this.loading$ = merge(navigationStart$, navigationEnd$);
  }
}
