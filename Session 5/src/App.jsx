// ============================================================
// src/App.jsx
// Root component — tab-based navigation between sections
// ============================================================
import { useState, useRef } from 'react';
import Playlist from './components/Playlist';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import Watchlist from './components/Watchlist';
import './App.css';

const TABS = [
  { id: 'playlists', label: '&#127925; Playlists' },
  { id: 'reviews',   label: '&#127869;&#65039; Reviews' },
  { id: 'watchlist', label: '&#127909; Watchlist' },
];

function App() {
  const [activeTab, setActiveTab] = useState('playlists');
  // Ref to ReviewList so ReviewForm can trigger a refresh after adding a review
  const reviewListRef = useRef(null);

  const handleReviewAdded = () => {
    if (reviewListRef.current) {
      reviewListRef.current.refresh();
    }
  };

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">&#128293;</span>
            <span className="logo-text">FireApp</span>
          </div>
          <p className="header-tagline">React + Firebase Firestore</p>
        </div>
      </header>

      {/* ── Navigation tabs ── */}
      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            dangerouslySetInnerHTML={{ __html: tab.label }}
          />
        ))}
      </nav>

      {/* ── Main content ── */}
      <main className="app-main">
        {activeTab === 'playlists' && <Playlist />}

        {activeTab === 'reviews' && (
          <div className="reviews-page">
            <ReviewForm onReviewAdded={handleReviewAdded} />
            <ReviewList ref={reviewListRef} />
          </div>
        )}

        {activeTab === 'watchlist' && <Watchlist />}
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>Built with React &#8226; Vite &#8226; Firebase Firestore</p>
      </footer>
    </div>
  );
}

export default App;
