import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

const MusicPlayer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onLike,
  isLiked,
}) => {
  const [progress, setProgress] =
    useState(0);

  const [volume, setVolume] =
    useState(80);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <div className="music-player-inner">
        <div className="music-player-song">
          <div className="music-player-cover">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
            />
          </div>

          <div className="music-player-info">
            <p className="music-player-title">{currentSong.title}</p>
            <p className="music-player-artist">{currentSong.artist}</p>
          </div>

          <button
            className={`btn btn-icon btn-ghost ${isLiked ? "liked" : ""}`}
            onClick={onLike}
            aria-label="Like song"
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

        <div className="music-player-controls">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
            <button
              className="btn btn-icon btn-ghost"
              onClick={onPrevious}
              aria-label="Previous song"
            >
              <SkipBack size={18} />
            </button>

            <button
              className="btn btn-icon btn-primary"
              onClick={onPlayPause}
              aria-label={
                isPlaying
                  ? "Pause"
                  : "Play"
              }
            >
              {isPlaying ? (
                <Pause
                  size={20}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={20}
                  fill="currentColor"
                />
              )}
            </button>

            <button
              className="btn btn-icon btn-ghost"
              onClick={onNext}
              aria-label="Next song"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="music-player-progress">
            <span className="music-player-time">0:00</span>

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) =>
                setProgress(
                  Number(e.target.value)
                )
              }
            />

            <span className="music-player-time">3:45</span>
          </div>
        </div>

        <div className="music-player-volume">
          <Volume2 size={18} />

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) =>
              setVolume(
                Number(e.target.value)
              )
            }
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;