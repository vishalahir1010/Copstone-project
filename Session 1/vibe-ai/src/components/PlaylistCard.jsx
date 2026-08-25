import React from "react";
import {
  Heart,
  MoreHorizontal,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        className="playlist-cover"
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
          <div className="playlist-cover-placeholder">
            ♫
          </div>
        )}

        <button
          className="playlist-play"
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

      <div className="playlist-info">
        <div>
          <h3>{playlist.name}</h3>

          <p>
            {playlist.description ||
              "Your personalized playlist"}
          </p>
        </div>

        <button
          className="playlist-more"
          aria-label="More playlist options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="playlist-footer">
        <span>
          {playlist.songCount || 0} songs
        </span>

        {onLike && (
          <button
            onClick={onLike}
            aria-label="Like playlist"
          >
            <Heart size={17} />
          </button>
        )}
      </div>
    </article>
  );
};

export default PlaylistCard;