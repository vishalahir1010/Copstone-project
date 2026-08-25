import {
  FETCH_OFFERS_REQUEST,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
} from '../actions/offersActions';

const initialState = {
  loading: false,
  offers: [],
  error: null,
};

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_OFFERS_SUCCESS:
      return { ...state, loading: false, offers: action.payload };

    case FETCH_OFFERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default offersReducer;
