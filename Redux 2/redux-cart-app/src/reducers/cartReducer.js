import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

const initialState = {
  items: [], // array of { id, name, price }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Avoid adding duplicates; bail out if already in cart
      const alreadyInCart = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (alreadyInCart) return state;

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
