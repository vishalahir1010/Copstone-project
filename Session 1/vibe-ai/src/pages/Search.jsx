import React, { useMemo, useState } from "react";
import {
  Search as SearchIcon,
  Music2,
  Play,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { songs } from "../data/songs";
import { searchSongs } from "../utils/musicUtils";
import { useMusic } from "../context/MusicContext";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const { playSong } = useMusic();

  const results = useMemo(() => {
    return searchSongs(songs, query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      setSearchParams({
        q: trimmedQuery,
      });
    } else {
      setSearchParams({});
    }
  };

  const handlePlay = (event, song) => {
    event.preventDefault();
    event.stopPropagation();

    playSong(song);
  };

  return (
    <main className="page search-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="page-header">
        <span className="eyebrow">Search</span>

        <h1>Search VibeAI</h1>

        <p>
          Find tracks, artists, genres and moods.
        </p>
      </section>

      {/* =====================================================
          SEARCH FORM
      ===================================================== */}
      <form
        className="large-search"
        onSubmit={handleSubmit}
      >
        <SearchIcon size={21} />

        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="What do you want to listen to?"
          aria-label="Search music"
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Search
        </button>
      </form>

      {/* =====================================================
          RESULT COUNT
      ===================================================== */}
      {query.trim() && (
        <p className="results-label">
          {results.length}{" "}
          {results.length === 1 ? "result" : "results"}{" "}
          for "{query}"
        </p>
      )}

      {/* =====================================================
          RESULTS
      ===================================================== */}
      <div className="search-results">
        {results.map((song) => (
          <article
            className="search-result"
            key={song.id}
          >
            <Link
              to={`/songs/${song.id}`}
              className="search-result-main"
            >
              <img
                src={song.cover}
                alt={`${song.title} by ${song.artist}`}
                loading="lazy"
              />

              <div>
                <h3>{song.title}</h3>

                <p>
                  {song.artist} · {song.genre}
                </p>

                <small>
                  {song.mood}
                </small>
              </div>
            </Link>

            {/* Play */}
            <button
              type="button"
              className="icon-btn"
              onClick={(event) =>
                handlePlay(event, song)
              }
              aria-label={`Play ${song.title}`}
            >
              <Play
                size={18}
                fill="currentColor"
              />
            </button>

            <Music2
              size={18}
              aria-hidden="true"
            />
          </article>
        ))}

        {/* ===================================================
            EMPTY STATE
        =================================================== */}
        {results.length === 0 && (
          <div className="empty-state">
            <Music2 size={32} />

            <h3>No results</h3>

            <p>
              Try another keyword, artist, genre or mood.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setQuery("");
                setSearchParams({});
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;