import React from "react";
import {
  Heart,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SongCard = ({
  song,
  isLiked = false,
  isPlaying = false,
  onPlay,
  onLike,
  onAdd,
}) => {
  const navigate = useNavigate();

  if (!song) return null;

  const openDetails = () => {
    navigate(`/songs/${song.id}`);
  };

  return (
    <article className="song-card">
      <div className="song-card-cover">
        <img
          src={song.cover}
          alt={`${song.title} cover`}
          loading="lazy"
        />

        <button
          className="song-card-play"
          onClick={onPlay}
          aria-label={`Play ${song.title}`}
        >
          <Play
            size={20}
            fill="currentColor"
          />
        </button>
      </div>

      <div className="song-card-info">
        <h3 className="song-card-title" onClick={openDetails}>
          {song.title}
        </h3>

        <p className="song-card-artist">
          {song.artist}
        </p>

        <div className="song-card-meta">
          {song.genre && (
            <span>{song.genre}</span>
          )}

          {song.mood && (
            <span>{song.mood}</span>
          )}

          {song.duration && (
            <span>{song.duration}</span>
          )}
        </div>
      </div>

      <div className="song-card-actions">
        <button
          className={`btn btn-icon btn-ghost ${
            isLiked ? "liked" : ""
          }`}
          onClick={onLike}
          aria-label={
            isLiked
              ? "Remove from liked songs"
              : "Add to liked songs"
          }
        >
          <Heart
            size={18}
            fill={
              isLiked
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {onAdd && (
          <button
            className="btn btn-sm btn-ghost"
            onClick={onAdd}
          >
            <Plus size={16} />
            Add
          </button>
        )}
      </div>
    </article>
  );
};

export default SongCard;