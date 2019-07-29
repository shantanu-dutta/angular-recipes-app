import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'http://burgerscoici.ro/wp-content/uploads/2018/10/sardina2_640-x-640-px.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
