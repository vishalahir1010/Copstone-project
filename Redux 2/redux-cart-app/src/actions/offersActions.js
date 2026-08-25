export const FETCH_OFFERS_REQUEST = 'FETCH_OFFERS_REQUEST';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';

// Pretend this is data coming back from a discounts API
const MOCK_OFFERS = [
  { id: 'offer1', title: '10% off Electronics', code: 'TECH10' },
  { id: 'offer2', title: 'Buy One Get One - Shoes', code: 'BOGO-SHOES' },
  { id: 'offer3', title: '$5 off orders over $50', code: 'SAVE5' },
];

/**
 * fetchOffers - async (thunk) action creator.
 * Simulates an API call with setTimeout, dispatching a
 * request/success/failure lifecycle so components can show
 * loading state and the resulting offers.
 */
export const fetchOffers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_OFFERS_REQUEST });

    setTimeout(() => {
      try {
        // Simulate a successful API response
        dispatch({ type: FETCH_OFFERS_SUCCESS, payload: MOCK_OFFERS });
      } catch (error) {
        dispatch({ type: FETCH_OFFERS_FAILURE, payload: error.message });
      }
    }, 1500); // 1.5s fake network delay
  };
};
