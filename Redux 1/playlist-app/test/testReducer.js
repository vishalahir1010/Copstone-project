/**
 * Part 2: Standalone test for playlistReducer.
 * Run with: node test/testReducer.js
 *
 * (Plain CommonJS copy of the reducer so it can run without a build step —
 *  the real ES module version used by the app lives in src/reducers/playlistReducer.js)
 */

const ADD_SONG = 'ADD_SONG';
const REMOVE_SONG = 'REMOVE_SONG';

const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_SONG:
      return [...state, action.payload];
    case REMOVE_SONG:
      return state.filter((song) => song !== action.payload);
    default:
      return state;
  }
};

function assertEqual(actual, expected, label) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? '✅ PASS' : '❌ FAIL'} — ${label}`);
  if (!pass) {
    console.log('   expected:', expected);
    console.log('   actual:  ', actual);
  }
}

// Test 1: adding a song to an empty playlist
const state1 = playlistReducer([], { type: ADD_SONG, payload: 'Kesariya' });
assertEqual(state1, ['Kesariya'], 'addSong on empty playlist');

// Test 2: adding a second song
const state2 = playlistReducer(state1, { type: ADD_SONG, payload: 'Shape of You' });
assertEqual(state2, ['Kesariya', 'Shape of You'], 'addSong appends to existing playlist');

// Test 3: removing a song
const state3 = playlistReducer(state2, { type: REMOVE_SONG, payload: 'Kesariya' });
assertEqual(state3, ['Shape of You'], 'removeSong filters out the matching song');

// Test 4: unknown action returns unchanged state
const state4 = playlistReducer(state3, { type: 'UNKNOWN' });
assertEqual(state4, state3, 'unknown action returns state unchanged');

console.log('\nFinal state:', state4);
