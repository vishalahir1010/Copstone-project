import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actions/wishlistActions';

const initialState = {
  items: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const alreadyInWishlist = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (alreadyInWishlist) return state;

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default wishlistReducer;
