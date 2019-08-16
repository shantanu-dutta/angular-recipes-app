import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('collapse', [
      state('open', style({ height: 0, visibility: 'hidden'})),
      state('closed', style({ height: '*', visibility: 'visible'})),
      transition('closed => open', animate('400ms cubic-bezier(0.4,0.0,0.2,1)')),
      transition('open => closed', animate('400ms cubic-bezier(0.4,0.0,0.2,1)'))
    ])
  ]
})
export class HeaderComponent {
  collapse: string = 'closed';
  constructor(
    public authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  toggleCollapse() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }

  onSaveData() {
    this.dataStorageService.StoreRecipes().subscribe(
      console.log,
      console.log
    );
  }

  onFetchData() {
    this.dataStorageService.GetRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}