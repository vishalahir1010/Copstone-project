import React, {
  useMemo,
  useState,
} from "react";

import {
  Check,
  Sparkles,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { songs } from "../data/songs";
import {
  getRandomSongs,
} from "../utils/musicUtils";

import { usePlaylists } from "../context/PlaylistContext";

const CreatePlaylist = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { createPlaylist } = usePlaylists();

  const selectedSong =
    searchParams.get("song");

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [mood, setMood] =
    useState("Chill");

  const [selected, setSelected] =
    useState(
      selectedSong
        ? [Number(selectedSong)]
        : []
    );

  const [error, setError] =
    useState("");

  const suggestions = useMemo(() => {
    const moodSongs = songs.filter(
      (song) => song.mood === mood
    );

    return getRandomSongs(
      moodSongs.length
        ? moodSongs
        : songs,
      6
    );
  }, [mood]);

  const toggleSong = (id) => {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter(
          (songId) => songId !== id
        );
      }

      return [...current, id];
    });

    setError("");
  };

  const generatePlaylist = () => {
    setSelected(
      suggestions.map(
        (song) => song.id
      )
    );

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Please enter a playlist name."
      );
      return;
    }

    if (selected.length === 0) {
      setError(
        "Select at least one song."
      );
      return;
    }

    const playlistData = {
      name: name.trim(),
      description:
        description.trim(),
      mood,
      songIds: selected,
    };

    const createdPlaylist =
      createPlaylist(playlistData);

    if (!createdPlaylist) {
      setError(
        "Unable to create playlist. Please try again."
      );
      return;
    }

    navigate(
      `/playlists/${createdPlaylist.id}`
    );
  };

  return (
    <main className="page narrow-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="page-header">
        <span className="eyebrow">
          <Sparkles size={15} />
          Playlist creator
        </span>

        <h1>
          Create your perfect playlist.
        </h1>

        <p>
          Pick a mood and let VibeAI
          suggest tracks.
        </p>
      </section>

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        {/* Playlist name */}

        <label>
          Playlist name

          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(
                event.target.value
              );
              setError("");
            }}
            placeholder="Friday Night Drive"
            maxLength={80}
            required
          />
        </label>

        {/* Description */}

        <label>
          Description

          <textarea
            rows="4"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="What is this playlist for?"
            maxLength={300}
          />
        </label>

        {/* Mood */}

        <label>
          Mood

          <select
            value={mood}
            onChange={(event) => {
              setMood(
                event.target.value
              );
              setError("");
            }}
          >
            <option value="Chill">
              Chill
            </option>

            <option value="Happy">
              Happy
            </option>

            <option value="Focus">
              Focus
            </option>

            <option value="Energetic">
              Energetic
            </option>

            <option value="Late Night">
              Late Night
            </option>

            <option value="Relax">
              Relax
            </option>
          </select>
        </label>

        {/* Error */}

        {error && (
          <p
            className="field-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* ===================================================
            AI SUGGESTIONS
        =================================================== */}

        <div className="suggestion-box">
          <div>
            <strong>
              AI suggestions
            </strong>

            <p>
              {suggestions.length} tracks
              available for this mood.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={
              generatePlaylist
            }
          >
            <Sparkles size={17} />
            Generate
          </button>
        </div>

        {/* ===================================================
            SONG SELECTION
        =================================================== */}

        <div className="selection-grid">
          {suggestions.map((song) => {
            const isSelected =
              selected.includes(
                song.id
              );

            return (
              <button
                type="button"
                className={`selection-card ${
                  isSelected
                    ? "selected"
                    : ""
                }`}
                key={song.id}
                onClick={() =>
                  toggleSong(
                    song.id
                  )
                }
                aria-pressed={
                  isSelected
                }
              >
                <img
                  src={song.cover}
                  alt={`${song.title} by ${song.artist}`}
                  loading="lazy"
                />

                <span>
                  <strong>
                    {song.title}
                  </strong>

                  <small>
                    {song.artist}
                  </small>
                </span>

                {isSelected && (
                  <Check size={17} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected count */}

        <p className="selection-count">
          {selected.length}{" "}
          {selected.length === 1
            ? "song"
            : "songs"}{" "}
          selected
        </p>

        {/* Submit */}

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create playlist
        </button>
      </form>
    </main>
  );
};

export default CreatePlaylist;