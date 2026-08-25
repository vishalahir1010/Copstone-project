import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, removeSong } from '../actions/songActions';

/**
 * Part 4: Connects to the Redux store via useSelector to read the playlist,
 * and re-renders automatically whenever the store updates.
 *
 * Part 5: Dispatches removeSong when the "Remove" button next to a song
 * is clicked (reducer uses Array.filter to drop it from the list).
 */
const Playlist = () => {
  const songs = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newSong, setNewSong] = useState('');

  const handleAdd = () => {
    const trimmed = newSong.trim();
    if (trimmed) {
      dispatch(addSong(trimmed));
      setNewSong('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="playlist-container">
      <h1>🎵 My Playlist</h1>

      <div className="add-song">
        <input
          type="text"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a song (e.g. Tum Hi Ho)"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {songs.length === 0 ? (
        <p className="empty-state">No songs yet — add one above!</p>
      ) : (
        <ul className="song-list">
          {songs.map((song, index) => (
            <li key={`${song}-${index}`} className="song-item">
              <span>{song}</span>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeSong(song))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlist;
