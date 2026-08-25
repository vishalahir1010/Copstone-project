// ============================================================
// src/components/Playlist.jsx
// Fetches and displays playlists from Firestore "playlists" collection
// ============================================================

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeded, setSeeded] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // ----------------------------------------------------------
  // Fetch all playlists from the Firestore "playlists" collection
  // using async/await with try/catch for proper error handling
  // ----------------------------------------------------------
  const fetchPlaylists = async () => {
    setLoading(true);
    setError(null);
    try {
      const playlistsRef = collection(db, "playlists");
      // Use getDocs() to retrieve all documents in the collection
      const snapshot = await getDocs(playlistsRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaylists(data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError("Failed to load playlists. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // Seed sample playlist documents into Firestore using addDoc()
  // Only runs once if no playlists exist
  // ----------------------------------------------------------
  const seedPlaylists = async () => {
    setSeeding(true);
    try {
      const samplePlaylists = [
        {
          name: "My Favorites",
          songs: ["Song One", "Song Two", "Song Three"],
          createdAt: serverTimestamp(),
        },
        {
          name: "Workout Beats",
          songs: ["Eye of the Tiger", "Stronger", "Can't Stop the Feeling"],
          createdAt: serverTimestamp(),
        },
        {
          name: "Chill Vibes",
          songs: ["Blinding Lights", "Watermelon Sugar", "Levitating"],
          createdAt: serverTimestamp(),
        },
      ];

      const playlistsRef = collection(db, "playlists");
      // Add each sample playlist document using addDoc()
      for (const playlist of samplePlaylists) {
        await addDoc(playlistsRef, playlist);
      }
      setSeeded(true);
      // Refresh the list after seeding
      await fetchPlaylists();
    } catch (err) {
      console.error("Error seeding playlists:", err);
      setError("Failed to seed playlists.");
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading playlists...</p>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>🎵 My Playlists</h2>
        <p className="section-subtitle">Your personal music collection from Firestore</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {playlists.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-icon">🎶</div>
          <h3>No playlists yet</h3>
          <p>Seed sample playlists to get started</p>
          <button
            className="btn btn-primary"
            onClick={seedPlaylists}
            disabled={seeding}
          >
            {seeding ? "Seeding..." : "Seed Sample Playlists"}
          </button>
          {seeded && (
            <p className="success-text">✅ Playlists seeded successfully!</p>
          )}
        </div>
      )}

      {playlists.length > 0 && (
        <>
          <div className="cards-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card playlist-card">
                <div className="card-header">
                  <div className="playlist-icon">🎵</div>
                  <h3 className="card-title">{playlist.name}</h3>
                </div>
                <div className="song-list">
                  {Array.isArray(playlist.songs) &&
                    playlist.songs.map((song, idx) => (
                      <div key={idx} className="song-item">
                        <span className="song-number">{idx + 1}</span>
                        <span className="song-name">{song}</span>
                        <span className="play-icon">▶</span>
                      </div>
                    ))}
                </div>
                <div className="card-footer">
                  <span className="song-count">
                    🎼 {playlist.songs?.length || 0} songs
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button className="btn btn-outline" onClick={fetchPlaylists}>
              🔄 Refresh Playlists
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Playlist;
