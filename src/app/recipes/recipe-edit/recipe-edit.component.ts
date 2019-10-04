import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  get ingredientsCtrl() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.navigateBack();
  }

  onSubmit() {
    this.editMode
      ? this.store.dispatch(
          RecipeActions.updateRecipe({ index: this.id, updatedRecipe: this.recipeForm.value as Recipe })
        )
      : this.store.dispatch(RecipeActions.addRecipe({ recipe: this.recipeForm.value as Recipe }));

    this.navigateBack();
  }

  onAddIngredient() {
    const ingredientsCtrl = this.recipeForm.get('ingredients') as FormArray;
    ingredientsCtrl.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    const ingredientsCtrl = this.recipeForm.get('ingredients') as FormArray;
    ingredientsCtrl.removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store
        .select(fromRecipe.recipesFeatureKey)
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }
}
