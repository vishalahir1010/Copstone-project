import React, { useEffect, useState } from "react";
import {
  Heart,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

import { songs } from "../data/songs";

const LikedSongs = () => {
  const [likedIds, setLikedIds] =
    useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem(
        "vibeai_liked_songs"
      ) || "[]"
    );

    setLikedIds(saved);
  }, []);

  const likedSongs = songs.filter(
    (song) =>
      likedIds.some(
        (id) =>
          String(id) ===
          String(song.id)
      )
  );

  const removeLiked = (id) => {
    const next = likedIds.filter(
      (item) =>
        String(item) !==
        String(id)
    );

    setLikedIds(next);

    localStorage.setItem(
      "vibeai_liked_songs",
      JSON.stringify(next)
    );
  };

  return (
    <main className="page">
      <section className="page-header">
        <span className="eyebrow">
          <Heart size={15} />
          Library
        </span>

        <h1>
          Liked songs
        </h1>

        <p>
          Your saved tracks in one place.
        </p>
      </section>

      {likedSongs.length > 0 ? (
        <div className="song-grid">
          {likedSongs.map((song) => (
            <article
              className="song-card"
              key={song.id}
            >
              <Link
                to={`/songs/${song.id}`}
                className="song-cover"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                />

                <span className="play-overlay">
                  <Play size={20} />
                </span>
              </Link>

              <div className="song-card-body">
                <h3>{song.title}</h3>

                <p>{song.artist}</p>

                <button
                  className="text-link"
                  onClick={() =>
                    removeLiked(
                      song.id
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={35} />

          <h3>
            No liked songs
          </h3>

          <p>
            Save tracks from Discover
            to build your library.
          </p>

          <Link
            to="/discover"
            className="btn btn-primary"
          >
            Discover music
          </Link>
        </div>
      )}
    </main>
  );
};

export default LikedSongs;