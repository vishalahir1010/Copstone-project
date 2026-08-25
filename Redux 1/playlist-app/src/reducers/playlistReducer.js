import { ADD_SONG, REMOVE_SONG } from '../actions/songActions';

const initialState = [];

/**
 * Part 2 + Part 5: playlistReducer
 * - ADD_SONG: appends the new song to the playlist array (immutably)
 * - REMOVE_SONG: filters out the song matching the payload name
 */
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SONG:
      return [...state, action.payload];

    case REMOVE_SONG:
      return state.filter((song) => song !== action.payload);

    default:
      return state;
  }
};

export default playlistReducer;
