// Action type constants
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';

/**
 * Part 1: addSong action creator
 * Takes a song name as payload, returns an action object.
 */
export const addSong = (songName) => ({
  type: ADD_SONG,
  payload: songName,
});

/**
 * Part 5: removeSong action creator
 * Takes a song name as payload, returns an action object.
 */
export const removeSong = (songName) => ({
  type: REMOVE_SONG,
  payload: songName,
});
