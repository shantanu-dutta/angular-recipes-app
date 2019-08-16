import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) { }

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
  }
}