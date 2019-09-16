import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

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

  constructor(
    public authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authState$ = this.store.select('auth');
  }

  toggleCollapse() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }

  onSaveData() {
    this.dataStorageService.StoreRecipes().subscribe(console.log, console.log);
  }

  onFetchData() {
    this.dataStorageService.GetRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
