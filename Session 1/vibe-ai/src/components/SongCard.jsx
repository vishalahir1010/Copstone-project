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
      <div className="song-card-image-wrapper">
        <img
          src={song.cover}
          alt={`${song.title} cover`}
          className="song-card-image"
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

        <button
          className={`song-card-like ${
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
      </div>

      <div className="song-card-content">
        <div
          className="song-card-title-row"
          onClick={openDetails}
        >
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>

          <button
            className="song-card-more"
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

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

        {onAdd && (
          <button
            className="song-card-add"
            onClick={onAdd}
          >
            <Plus size={16} />
            Add to playlist
          </button>
        )}

        {isPlaying && (
          <div className="playing-indicator">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </article>
  );
};

export default SongCard;