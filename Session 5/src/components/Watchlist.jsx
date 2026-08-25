// ============================================================
// src/components/Watchlist.jsx
// Fetches and displays movies from the "watchlists" Firestore collection
// BookMyShow-style card layout with watched / not-watched status
// ============================================================
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  // ----------------------------------------------------------
  // Fetch all documents from "watchlists" collection using async/await + try/catch
  // ----------------------------------------------------------
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const watchlistsRef = collection(db, 'watchlists');
      // Use getDocs() to retrieve all watchlist documents
      const snapshot = await getDocs(watchlistsRef);
      const data = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      setMovies(data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      setError('Failed to load your watchlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // Seed sample movie documents using addDoc()
  // ----------------------------------------------------------
  const seedWatchlist = async () => {
    setSeeding(true);
    try {
      const sampleMovies = [
        { movieName: 'Avengers: Endgame', watched: true, genre: 'Action', createdAt: serverTimestamp() },
        { movieName: 'Dangal', watched: false, genre: 'Drama', createdAt: serverTimestamp() },
        { movieName: 'Inception', watched: true, genre: 'Sci-Fi', createdAt: serverTimestamp() },
        { movieName: 'The Dark Knight', watched: false, genre: 'Action', createdAt: serverTimestamp() },
        { movieName: '3 Idiots', watched: true, genre: 'Comedy', createdAt: serverTimestamp() },
        { movieName: 'Interstellar', watched: false, genre: 'Sci-Fi', createdAt: serverTimestamp() },
      ];
      const watchlistsRef = collection(db, 'watchlists');
      for (const movie of sampleMovies) {
        await addDoc(watchlistsRef, movie);
      }
      setSeeded(true);
      await fetchMovies();
    } catch (err) {
      console.error('Error seeding watchlist:', err);
      setError('Failed to seed watchlist data.');
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const watchedCount = movies.filter((m) => m.watched).length;
  const unwatchedCount = movies.filter((m) => !m.watched).length;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading watchlist...</p>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>&#127916; Movie Watchlist</h2>
        <p className="section-subtitle">Track what you have watched and what is next</p>
      </div>

      {error && <div className="alert alert-error"><span>&#9888;&#65039;</span> {error}</div>}

      {movies.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-icon">&#127910;</div>
          <h3>No movies in watchlist</h3>
          <p>Seed some sample movies to get started!</p>
          <button className="btn btn-primary" onClick={seedWatchlist} disabled={seeding}>
            {seeding ? 'Seeding...' : 'Seed Sample Movies'}
          </button>
          {seeded && <p className="success-text">&#10003; Watchlist seeded!</p>}
        </div>
      )}

      {movies.length > 0 && (
        <>
          <div className="watchlist-stats">
            <div className="stat-badge watched-stat">
              <span className="stat-number">{watchedCount}</span>
              <span className="stat-label">Watched</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-badge unwatched-stat">
              <span className="stat-number">{unwatchedCount}</span>
              <span className="stat-label">To Watch</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-badge total-stat">
              <span className="stat-number">{movies.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>

          <div className="cards-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`card movie-card ${movie.watched ? 'watched-card' : 'unwatched-card'}`}
              >
                <div className="movie-poster">
                  <span className="movie-emoji">&#127916;</span>
                  <span className={`status-badge ${movie.watched ? 'badge-watched' : 'badge-unwatched'}`}>
                    {movie.watched ? 'Watched' : 'Not Watched'}
                  </span>
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.movieName}</h3>
                  {movie.genre && <span className="movie-genre">{movie.genre}</span>}
                  <div className={`watch-status ${movie.watched ? 'status-watched' : 'status-unwatched'}`}>
                    {movie.watched ? '&#10003; Watched' : 'Not Watched'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button className="btn btn-outline" onClick={fetchMovies}>
              Refresh Watchlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
