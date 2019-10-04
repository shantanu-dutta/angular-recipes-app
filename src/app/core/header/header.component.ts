import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('collapse', [
      state('open', style({ height: 0, visibility: 'hidden' })),
      state('closed', style({ height: '*', visibility: 'visible' })),
      transition('closed => open', animate('400ms cubic-bezier(0.4,0.0,0.2,1)')),
      transition('open => closed', animate('400ms cubic-bezier(0.4,0.0,0.2,1)'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  collapse = 'closed';
  authState$: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  toggleCollapse() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }

  onSaveData() {
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
