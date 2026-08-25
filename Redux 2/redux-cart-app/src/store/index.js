import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import cartReducer from '../reducers/cartReducer';
import wishlistReducer from '../reducers/wishlistReducer';
import offersReducer from '../reducers/offersReducer';

// Task 3: combine cartReducer + wishlistReducer (+ offersReducer for task 4)
// into a single root reducer.
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  offers: offersReducer,
});

// Task 4 + 5: apply redux-thunk middleware and wire up the
// Redux DevTools Extension via composeWithDevTools so the
// browser extension can inspect/track every dispatched action.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
