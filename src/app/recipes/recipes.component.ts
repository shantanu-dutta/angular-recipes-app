import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';

import { RecipeService } from './recipe.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  destroy$ = new Subject();

  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.recipesService.getSelectedRecipe().pipe(
      takeUntil(this.destroy$)
    ).subscribe((recipe: Recipe) => (this.selectedRecipe = recipe));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
