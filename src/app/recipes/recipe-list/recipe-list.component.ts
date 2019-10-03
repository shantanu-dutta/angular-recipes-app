import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipe from '../store/recipe.reducers';
import * as recipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState$: Observable<fromRecipe.State>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.recipesState$ = this.store.select(fromRecipe.recipesFeatureKey);
    this.fetchRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  fetchRecipes() {
    this.store.dispatch(recipeActions.fetchRecipes());
  }
}
