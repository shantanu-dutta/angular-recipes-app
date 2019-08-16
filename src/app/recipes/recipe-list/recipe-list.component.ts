import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  recipes: Recipe[];

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataStorageService.GetRecipes();
    this.recipesService.RecipesChanged().pipe(
      takeUntil(this.destroy$)
    ).subscribe((recipes: Recipe[]) => this.recipes = recipes);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route, });
  }
}
