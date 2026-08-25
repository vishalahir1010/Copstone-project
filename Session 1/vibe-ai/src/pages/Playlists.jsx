import React, { useMemo, useState } from "react";
import {
  ListMusic,
  Plus,
  Search,
  Music2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { usePlaylists } from "../context/PlaylistContext";

const Playlists = () => {
  const { playlists } = usePlaylists();
  const [query, setQuery] = useState("");

  const filteredPlaylists = useMemo(() => {
    const searchQuery = query.trim().toLowerCase();

    if (!searchQuery) {
      return playlists;
    }

    return playlists.filter((playlist) => {
      const title = playlist.title || playlist.name || "";
      const description = playlist.description || "";

      return (
        title.toLowerCase().includes(searchQuery) ||
        description.toLowerCase().includes(searchQuery)
      );
    });
  }, [playlists, query]);

  return (
    <main className="page playlists-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="page-header">
        <div>
          <span className="eyebrow">
            <ListMusic size={16} />
            Your music
          </span>

          <h1>Your playlists</h1>

          <p>
            Create, organize, and enjoy your favorite
            collections in one place.
          </p>
        </div>

        <Link
          to="/playlists/create"
          className="btn btn-primary"
        >
          <Plus size={18} />
          Create playlist
        </Link>
      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}
      <section className="playlist-toolbar">
        <label className="search-field">
          <Search size={19} />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search your playlists..."
            aria-label="Search playlists"
          />
        </label>

        <span className="results-meta">
          <ListMusic size={16} />

          {filteredPlaylists.length}{" "}
          {filteredPlaylists.length === 1
            ? "playlist"
            : "playlists"}
        </span>
      </section>

      {/* =====================================================
          PLAYLIST GRID
      ===================================================== */}
      {filteredPlaylists.length > 0 ? (
        <section className="playlist-grid">
          {filteredPlaylists.map((playlist) => {
            const playlistTitle =
              playlist.title ||
              playlist.name ||
              "Untitled Playlist";

            const description =
              playlist.description ||
              "Your personal music collection.";

            const cover =
              playlist.cover ||
              playlist.image ||
              playlist.songs?.[0]?.cover ||
              "";

            const songCount = Array.isArray(
              playlist.songs
            )
              ? playlist.songs.length
              : playlist.songIds?.length || 0;

            return (
              <article
                className="playlist-card"
                key={playlist.id}
              >
                {/* Cover */}
                <Link
                  to={`/playlists/${playlist.id}`}
                  className="playlist-cover"
                  aria-label={`Open ${playlistTitle}`}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={playlistTitle}
                      loading="lazy"
                    />
                  ) : (
                    <div className="playlist-cover-placeholder">
                      <Music2 size={42} />
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="playlist-card-body">
                  <Link
                    to={`/playlists/${playlist.id}`}
                  >
                    <h2>{playlistTitle}</h2>
                  </Link>

                  <p>{description}</p>

                  <div className="playlist-card-footer">
                    <span>
                      <Music2 size={15} />
                      {songCount}{" "}
                      {songCount === 1
                        ? "song"
                        : "songs"}
                    </span>

                    <Link
                      to={`/playlists/${playlist.id}`}
                      className="text-link"
                      aria-label={`Open ${playlistTitle}`}
                    >
                      Open
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        /* ===================================================
           EMPTY STATE
        =================================================== */
        <section className="empty-state playlists-empty">
          <div className="empty-state-icon">
            <ListMusic size={36} />
          </div>

          <h2>
            {query
              ? "No playlists found"
              : "Create your first playlist"}
          </h2>

          <p>
            {query
              ? "Try another playlist name."
              : "Build a collection of songs that matches your vibe."}
          </p>

          {query ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          ) : (
            <Link
              to="/playlists/create"
              className="btn btn-primary"
            >
              <Plus size={18} />
              Create playlist
            </Link>
          )}
        </section>
      )}
    </main>
  );
};

export default Playlists;