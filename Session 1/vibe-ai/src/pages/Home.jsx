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
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={16} />
            AI-powered music discovery
          </span>

          <h1>
            Music that matches <span>your vibe.</span>
          </h1>

          <p>
            Discover songs, create intelligent playlists, and find your next
            favorite track with VibeAI.
          </p>

          <div className="hero-actions">
            <Link to="/discover" className="btn btn-primary">
              <Headphones size={18} />
              Explore Music
            </Link>

            <Link
              to="/playlists/create"
              className="btn btn-secondary"
            >
              <Sparkles size={18} />
              Create Playlist
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-disc">
            <Music2 size={80} />
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED TRACKS
      ===================================================== */}
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              Handpicked for you
            </span>

            <h2>Featured tracks</h2>
          </div>

          <Link
            to="/discover"
            className="text-link"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {featuredSongs.length > 0 ? (
          <div className="song-grid">
            {featuredSongs.map((song) => (
              <article
                className="song-card"
                key={song.id}
              >
                <div className="song-cover">
                  <Link
                    to={`/songs/${song.id}`}
                    aria-label={`View ${song.title}`}
                  >
                    <img
                      src={song.cover}
                      alt={`${song.title} by ${song.artist}`}
                      loading="lazy"
                    />
                  </Link>

                  <button
                    type="button"
                    className="play-overlay"
                    onClick={(event) =>
                      handlePlay(event, song)
                    }
                    aria-label={`Play ${song.title}`}
                  >
                    <Play
                      size={20}
                      fill="currentColor"
                    />
                  </button>
                </div>

                <div className="song-card-body">
                  <Link to={`/songs/${song.id}`}>
                    <h3>{song.title}</h3>
                  </Link>

                  <p>
                    {song.artist} · {song.genre}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Music2 size={32} />

            <h3>No featured tracks</h3>

            <p>
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
      <section className="section ai-section">
        <div>
          <span className="eyebrow">
            <Sparkles size={15} />
            Smart recommendations
          </span>

          <h2>Tell VibeAI how you feel.</h2>

          <p>
            Choose a mood and discover a personalized collection
            of tracks built around it.
          </p>

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