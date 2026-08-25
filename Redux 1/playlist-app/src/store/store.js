import { createStore } from 'redux';
import playlistReducer from '../reducers/playlistReducer';

// Part 3: Set up the Redux store with playlistReducer
const store = createStore(playlistReducer);

export default store;
