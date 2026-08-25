import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Sparkles,
  Play,
  Music2,
} from "lucide-react";

import { songs } from "../data/songs";
import { useMusic } from "../context/MusicContext";
import SongCard from "../components/SongCard";

const Home = () => {
  const { playSong } = useMusic();

  const featuredSongs = songs
    .filter((song) => song.featured)
    .slice(0, 6);

  const handlePlay = (event, song) => {
    event.preventDefault();
    event.stopPropagation();

    playSong(song);
  };

  return (
    <main className="page home-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">
              <Sparkles size={16} />
              AI-powered music discovery
            </span>

            <h1 className="hero-title">
              Music that matches <span>your vibe.</span>
            </h1>

            <p className="hero-description">
              Discover songs, create intelligent playlists, and find your next
              favorite track with VibeAI.
            </p>

            <div className="hero-actions">
              <Link to="/discover" className="btn btn-primary btn-lg">
                <Headphones size={18} />
                Explore Music
              </Link>

              <Link
                to="/create-playlist"
                className="btn btn-secondary btn-lg"
              >
                <Sparkles size={18} />
                Create Playlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED TRACKS
      ===================================================== */}
      <section className="section container">
        <div className="section-header">
          <div className="section-header-content">
            <span className="hero-eyebrow" style={{ marginBottom: '0.5rem' }}>
              Handpicked for you
            </span>

            <h2 className="section-title">Featured tracks</h2>
          </div>

          <Link
            to="/discover"
            className="section-link"
          >
            View all
            <ArrowRight size={16} style={{ display: 'inline', marginLeft: '4px' }} />
          </Link>
        </div>

        {featuredSongs.length > 0 ? (
          <div className="song-grid">
            {featuredSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={(e) => handlePlay(e, song)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Music2 size={32} />
            </div>

            <h3 className="empty-state-title">No featured tracks</h3>

            <p className="empty-state-description">
              There are no featured songs available right now.
            </p>

            <Link
              to="/discover"
              className="btn btn-primary"
            >
              Explore music
            </Link>
          </div>
        )}
      </section>

      {/* =====================================================
          AI RECOMMENDATION
      ===================================================== */}
      <section className="section container">
        <div className="ai-generator">
          <div className="ai-generator-header">
            <span className="hero-eyebrow" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={15} />
              Smart recommendations
            </span>

            <h2 className="ai-generator-title">Tell VibeAI how you feel.</h2>

            <p className="ai-generator-description">
              Choose a mood and discover a personalized collection
              of tracks built around it.
            </p>
          </div>

          <Link
            to="/discover"
            className="btn btn-primary"
          >
            Find my vibe
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;