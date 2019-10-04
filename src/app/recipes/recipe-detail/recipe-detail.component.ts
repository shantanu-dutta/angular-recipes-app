import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store
        .select(fromRecipe.recipesFeatureKey)
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          this.recipe = recipeState.recipes[this.id];
        });
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients: this.recipe.ingredients }));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
