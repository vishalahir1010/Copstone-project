import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Play,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

import { songs } from "../data/songs";
import {
  GENRE_OPTIONS,
  MOOD_OPTIONS,
  SORT_OPTIONS,
} from "../utils/constants";

import {
  filterByGenre,
  filterByMood,
  searchSongs,
  sortSongs,
} from "../utils/musicUtils";

import { useMusic } from "../context/MusicContext";

const Discover = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [mood, setMood] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const {
    playSong,
    toggleLike,
    isLiked,
  } = useMusic();

  const filteredSongs = useMemo(() => {
    let result = searchSongs(songs, query);

    result = filterByGenre(result, genre);
    result = filterByMood(result, mood);
    result = sortSongs(result, sortBy);

    return result;
  }, [query, genre, mood, sortBy]);

  const handlePlay = (song) => {
    playSong(song);
  };

  const handleLike = (songId) => {
    toggleLike(songId);
  };

  return (
    <main className="page discover-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="page-header">
        <span className="eyebrow">Discover</span>

        <h1>Find your next favorite song.</h1>

        <p>
          Search by artist, genre, mood, album, or title.
        </p>
      </section>

      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}
      <section className="discover-toolbar">
        <label className="search-field">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search songs, artists..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            aria-label="Search songs and artists"
          />
        </label>

        <div className="filter-row">
          {/* Genre */}
          <label>
            <span>Genre</span>

            <select
              value={genre}
              onChange={(event) =>
                setGenre(event.target.value)
              }
            >
              {GENRE_OPTIONS.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          {/* Mood */}
          <label>
            <span>Mood</span>

            <select
              value={mood}
              onChange={(event) =>
                setMood(event.target.value)
              }
            >
              {MOOD_OPTIONS.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          {/* Sort */}
          <label>
            <span>Sort</span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              {SORT_OPTIONS.map((item) => (
                <option
                  value={item.value}
                  key={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* =====================================================
          RESULTS META
      ===================================================== */}
      <div className="results-meta">
        <span>
          <SlidersHorizontal size={16} />

          {filteredSongs.length}{" "}
          {filteredSongs.length === 1
            ? "track"
            : "tracks"}
        </span>
      </div>

      {/* =====================================================
          RESULTS
      ===================================================== */}
      {filteredSongs.length > 0 ? (
        <div className="song-grid">
          {filteredSongs.map((song) => {
            const liked = isLiked(song.id);

            return (
              <article
                className="song-card"
                key={song.id}
              >
                {/* Cover */}
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

                  {/* Play */}
                  <button
                    type="button"
                    className="play-overlay"
                    onClick={() =>
                      handlePlay(song)
                    }
                    aria-label={`Play ${song.title}`}
                  >
                    <Play
                      size={20}
                      fill="currentColor"
                    />
                  </button>
                </div>

                {/* Song information */}
                <div className="song-card-body">
                  <div className="song-title-row">
                    <div>
                      <Link
                        to={`/songs/${song.id}`}
                      >
                        <h3>{song.title}</h3>
                      </Link>

                      <p>{song.artist}</p>
                    </div>

                    {/* Like */}
                    <button
                      type="button"
                      className={`icon-btn ${
                        liked ? "is-active" : ""
                      }`}
                      onClick={() =>
                        handleLike(song.id)
                      }
                      aria-label={
                        liked
                          ? `Unlike ${song.title}`
                          : `Like ${song.title}`
                      }
                      aria-pressed={liked}
                    >
                      <Heart
                        size={18}
                        fill={
                          liked
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <small>
                    {song.genre} · {song.mood}
                  </small>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* ===================================================
           EMPTY STATE
        =================================================== */
        <div className="empty-state">
          <Search size={32} />

          <h3>No tracks found</h3>

          <p>
            Try another search or filter.
          </p>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setQuery("");
              setGenre("All");
              setMood("All");
              setSortBy("default");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Discover;