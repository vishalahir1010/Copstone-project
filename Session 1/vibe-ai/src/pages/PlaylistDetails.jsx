import React from "react";
import {
  ArrowLeft,
  ListMusic,
  Play,
  Trash2,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { songs } from "../data/songs";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const playlists = JSON.parse(
    localStorage.getItem("vibeai_playlists") || "[]"
  );

  const playlist = playlists.find(
    (item) => String(item.id) === String(playlistId)
  );

  if (!playlist) {
    return (
      <main className="page">
        <div className="empty-state">
          <h2>Playlist not found</h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/playlists")}
          >
            Back to playlists
          </button>
        </div>
      </main>
    );
  }

  const playlistSongs = playlist.songIds
    .map((id) =>
      songs.find(
        (song) => String(song.id) === String(id)
      )
    )
    .filter(Boolean);

  const removeSong = (songId) => {
    const updated = playlists.map((item) => {
      if (item.id !== playlist.id) {
        return item;
      }

      return {
        ...item,
        songIds: item.songIds.filter(
          (id) => String(id) !== String(songId)
        ),
      };
    });

    localStorage.setItem(
      "vibeai_playlists",
      JSON.stringify(updated)
    );

    window.location.reload();
  };

  return (
    <main className="page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <section className="playlist-header">
        <div className="playlist-large-cover">
          <ListMusic size={64} />
        </div>

        <div>
          <span className="eyebrow">
            Playlist
          </span>

          <h1>{playlist.name}</h1>

          <p>
            {playlist.description ||
              "A collection created with VibeAI."}
          </p>

          <span>
            {playlistSongs.length} tracks
          </span>
        </div>
      </section>

      <section className="track-list">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((song, index) => (
            <div
              className="track-row"
              key={song.id}
            >
              <span>{index + 1}</span>

              <img
                src={song.cover}
                alt={song.title}
              />

              <div className="track-main">
                <Link to={`/songs/${song.id}`}>
                  <strong>{song.title}</strong>
                </Link>

                <small>{song.artist}</small>
              </div>

              <button className="icon-btn">
                <Play size={17} />
              </button>

              <button
                className="icon-btn danger"
                onClick={() =>
                  removeSong(song.id)
                }
                aria-label="Remove song"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>This playlist is empty</h3>

            <Link
              to="/discover"
              className="btn btn-primary"
            >
              Discover songs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default PlaylistDetails;