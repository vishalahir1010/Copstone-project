import React from "react";
import {
  Heart,
  MoreHorizontal,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/responsive.css";

const PlaylistCard = ({
  playlist,
  onPlay,
  onLike,
}) => {
  const navigate = useNavigate();

  if (!playlist) return null;

  return (
    <article className="playlist-card">
      <div
        className="playlist-card-cover"
        onClick={() =>
          navigate(
            `/playlists/${playlist.id}`
          )
        }
      >
        {playlist.cover ? (
          <img
            src={playlist.cover}
            alt={playlist.name}
            loading="lazy"
          />
        ) : (
          <div className="playlist-card-overlay">
            ♫
          </div>
        )}

        <div className="playlist-card-overlay">
          <button
            className="btn btn-icon btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.();
            }}
            aria-label="Play playlist"
          >
            <Play
              size={20}
              fill="currentColor"
            />
          </button>
        </div>
      </div>

      <div className="playlist-card-content">
        <h3 className="playlist-card-title">{playlist.name}</h3>

        <p className="playlist-card-description">
          {playlist.description ||
            "Your personalized playlist"}
        </p>

        <div className="playlist-card-meta">
          <span>
            {playlist.songCount || 0} songs
          </span>

          {onLike && (
            <button
              className="btn btn-icon btn-ghost btn-sm"
              onClick={onLike}
              aria-label="Like playlist"
            >
              <Heart size={17} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default PlaylistCard;