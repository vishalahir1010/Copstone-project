# Redux Shopping Cart Demo

A React app demonstrating a full Redux setup: a cart reducer, combined
reducers, redux-thunk for async actions, and Redux DevTools integration.

## What's inside (mapped to the 5 tasks)

1. **Redux store + `cartReducer`** — `src/store/index.js` creates the store;
   `src/reducers/cartReducer.js` manages `state.cart.items`, an array of
   `{ id, name, price }` objects.
2. **`addToCart` / `removeFromCart` actions** — defined in
   `src/actions/cartActions.js` and dispatched from the two buttons inside
   `src/components/ProductCard.js`.
3. **`combineReducers`** — `src/store/index.js` combines `cartReducer` and
   `wishlistReducer` (plus `offersReducer`) into one root reducer, so cart
   and wishlist state live independently at `state.cart` and
   `state.wishlist`.
4. **redux-thunk + `fetchOffers`** — `src/actions/offersActions.js` exports
   an async thunk that dispatches a `FETCH_OFFERS_REQUEST`, waits 1.5s via
   `setTimeout` to simulate an API call, then dispatches
   `FETCH_OFFERS_SUCCESS` with mock discount data. Triggered from the
   "Fetch Offers" button in `src/components/Offers.js`.
5. **Redux DevTools** — wired up in `src/store/index.js` via
   `composeWithDevTools` from `redux-devtools-extension`.

## Setup

```bash
npm install
npm start
```

This uses Create React App's dev server (`react-scripts`), so it opens at
`http://localhost:3000`.

## Using Redux DevTools to inspect state changes

The store is already configured for the extension — you just need the
browser extension installed:

1. Install **Redux DevTools** for
   [Chrome](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
   or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/).
2. Run `npm start` and open the app in that browser.
3. Open DevTools (F12) → click the **Redux** tab.
4. In the app, click **Add to Cart**, **Remove from Cart**,
   **Add to Wishlist**, and **Fetch Offers**.
5. In the Redux DevTools panel you'll see each dispatched action
   (`ADD_TO_CART`, `REMOVE_FROM_CART`, `ADD_TO_WISHLIST`,
   `FETCH_OFFERS_REQUEST` → `FETCH_OFFERS_SUCCESS`, etc.) listed on the
   left, with the resulting state tree and diff shown on the right. Click
   any action in the list to time-travel to that point in state history.
6. To capture the screenshots the task asks for, take a screenshot of that
   DevTools panel after each action — the app itself doesn't need any extra
   code for this, since `composeWithDevTools` already exposes everything
   the extension needs.

## Project structure

```
src/
  actions/
    cartActions.js       ADD_TO_CART / REMOVE_FROM_CART
    wishlistActions.js   ADD_TO_WISHLIST / REMOVE_FROM_WISHLIST
    offersActions.js     fetchOffers (redux-thunk async action)
  reducers/
    cartReducer.js
    wishlistReducer.js
    offersReducer.js
  store/
    index.js             createStore + combineReducers + thunk + DevTools
  components/
    ProductCard.js        Add/remove-to-cart buttons
    Cart.js
    Wishlist.js
    Offers.js
  App.js
  index.js
```
