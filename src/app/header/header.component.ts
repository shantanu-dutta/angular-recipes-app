import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  onSaveData() {
    this.dataStorageService.StoreRecipes().subscribe(
      console.log,
      console.log
    );
  }

  onFetchData() {
    this.dataStorageService.FetchRecipes();
  }
}