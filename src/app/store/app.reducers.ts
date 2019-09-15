import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuthState from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuthState.State;
}
