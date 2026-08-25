import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Play,
  Plus,
  Star,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { songs } from "../data/songs";
import { getRecommendations } from "../utils/musicUtils";

const SongDetails = () => {
  const { songId } = useParams();
  const navigate = useNavigate();

  const song = songs.find(
    (item) => String(item.id) === String(songId)
  );

  const [liked, setLiked] = useState(() => {
    const likedSongs = JSON.parse(
      localStorage.getItem("vibeai_liked_songs") || "[]"
    );

    return likedSongs.includes(Number(songId));
  });

  const recommendations = useMemo(() => {
    if (!song) return [];

    return getRecommendations(
      songs,
      song,
      4
    );
  }, [song]);

  if (!song) {
    return (
      <main className="page">
        <div className="empty-state">
          <h2>Song not found</h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/discover")}
          >
            Back to Discover
          </button>
        </div>
      </main>
    );
  }

  const toggleLike = () => {
    const current = JSON.parse(
      localStorage.getItem("vibeai_liked_songs") || "[]"
    );

    let next;

    if (liked) {
      next = current.filter(
        (id) => Number(id) !== Number(song.id)
      );
    } else {
      next = [...current, song.id];
    }

    localStorage.setItem(
      "vibeai_liked_songs",
      JSON.stringify(next)
    );

    setLiked(!liked);
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

      <section className="song-detail">
        <img
          className="detail-cover"
          src={song.cover}
          alt={song.title}
        />

        <div className="detail-info">
          <span className="eyebrow">
            {song.genre} · {song.mood}
          </span>

          <h1>{song.title}</h1>

          <h2>{song.artist}</h2>

          <p>{song.description}</p>

          <div className="detail-stats">
            <span>
              <Star size={16} />
              {song.rating}
            </span>

            <span>
              {song.plays?.toLocaleString()} plays
            </span>

            <span>{song.duration}</span>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary">
              <Play size={18} fill="currentColor" />
              Play
            </button>

            <button
              className={`btn btn-secondary ${
                liked ? "active" : ""
              }`}
              onClick={toggleLike}
            >
              <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
              />

              {liked ? "Liked" : "Like"}
            </button>

            <Link
              to={`/playlists/create?song=${song.id}`}
              className="btn btn-secondary"
            >
              <Plus size={18} />
              Add to playlist
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              Because you listened
            </span>

            <h2>You may also like</h2>
          </div>
        </div>

        <div className="song-grid">
          {recommendations.map((item) => (
            <Link
              className="song-card"
              key={item.id}
              to={`/songs/${item.id}`}
            >
              <img
                className="song-cover"
                src={item.cover}
                alt={item.title}
              />

              <div className="song-card-body">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SongDetails;