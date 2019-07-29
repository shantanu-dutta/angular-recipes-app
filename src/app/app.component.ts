import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipes';

  onNavigate(feature: string): void { this.loadedFeature = feature; }
  showRecipes(): boolean { return this.loadedFeature === 'recipes'; }
  showShoppingList(): boolean { return this.loadedFeature === 'shopping-list'; }
}
