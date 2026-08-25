import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { songs } from "../data/songs";
import {
  filterByGenre,
  filterByMood,
  searchSongs,
  sortSongs,
} from "../utils/musicUtils";

const MusicContext =
  createContext(null);

const LIKED_KEY =
  "vibeai_liked_songs";

const PLAYLIST_KEY =
  "vibeai_playlists";

const RECENT_KEY =
  "vibeai_recently_played";

const SETTINGS_KEY =
  "vibeai_music_settings";

const getArray = (key) => {
  try {
    const value = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(value)
      ? value
      : [];
  } catch {
    return [];
  }
};

const MusicProvider = ({
  children,
}) => {
  const [likedSongIds, setLikedSongIds] =
    useState(() =>
      getArray(LIKED_KEY)
    );

  const [playlists, setPlaylists] =
    useState(() =>
      getArray(PLAYLIST_KEY)
    );

  const [recentlyPlayed, setRecentlyPlayed] =
    useState(() =>
      getArray(RECENT_KEY)
    );

  const [currentSong, setCurrentSong] =
    useState(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [volume, setVolume] =
    useState(80);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedGenre, setSelectedGenre] =
    useState("All");

  const [selectedMood, setSelectedMood] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  /*
   * Persist liked songs
   */
  useEffect(() => {
    localStorage.setItem(
      LIKED_KEY,
      JSON.stringify(likedSongIds)
    );
  }, [likedSongIds]);

  /*
   * Persist playlists
   */
  useEffect(() => {
    localStorage.setItem(
      PLAYLIST_KEY,
      JSON.stringify(playlists)
    );
  }, [playlists]);

  /*
   * Persist recently played
   */
  useEffect(() => {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(recentlyPlayed)
    );
  }, [recentlyPlayed]);

  /*
   * Load music settings
   */
  useEffect(() => {
    try {
      const settings = JSON.parse(
        localStorage.getItem(
          SETTINGS_KEY
        ) || "null"
      );

      if (
        settings &&
        typeof settings.volume ===
          "number"
      ) {
        setVolume(settings.volume);
      }
    } catch {
      // Ignore invalid local storage data.
    }
  }, []);

  /*
   * Save music settings
   */
  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        volume,
      })
    );
  }, [volume]);

  /*
   * Like / unlike song
   */
  const toggleLike = useCallback(
    (songId) => {
      setLikedSongIds((current) => {
        const exists =
          current.some(
            (id) =>
              String(id) ===
              String(songId)
          );

        if (exists) {
          return current.filter(
            (id) =>
              String(id) !==
              String(songId)
          );
        }

        return [...current, songId];
      });
    },
    []
  );

  const isLiked = useCallback(
    (songId) => {
      return likedSongIds.some(
        (id) =>
          String(id) ===
          String(songId)
      );
    },
    [likedSongIds]
  );

  const likedSongs = useMemo(() => {
    return songs.filter((song) =>
      likedSongIds.some(
        (id) =>
          String(id) ===
          String(song.id)
      )
    );
  }, [likedSongIds]);

  /*
   * Play song
   */
  const playSong = useCallback(
    (song) => {
      if (!song) return;

      setCurrentSong(song);
      setIsPlaying(true);

      setRecentlyPlayed(
        (current) => {
          const withoutSong =
            current.filter(
              (id) =>
                String(id) !==
                String(song.id)
            );

          return [
            song.id,
            ...withoutSong,
          ].slice(0, 10);
        }
      );
    },
    []
  );

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeSong = useCallback(() => {
    if (currentSong) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  const stopSong = useCallback(() => {
    setIsPlaying(false);
    setCurrentSong(null);
  }, []);

  /*
   * Create playlist
   */
  const createPlaylist = useCallback(
    ({
      name,
      description = "",
      mood = "Chill",
      songIds = [],
    }) => {
      if (!name?.trim()) {
        return {
          success: false,
          message:
            "Playlist name is required.",
        };
      }

      const playlist = {
        id: Date.now(),
        name: name.trim(),
        description:
          description.trim(),
        mood,
        songIds,
        createdAt:
          new Date().toISOString(),
        updatedAt:
          new Date().toISOString(),
      };

      setPlaylists((current) => [
        ...current,
        playlist,
      ]);

      return {
        success: true,
        playlist,
      };
    },
    []
  );

  /*
   * Update playlist
   */
  const updatePlaylist = useCallback(
    (playlistId, updates) => {
      setPlaylists((current) =>
        current.map((playlist) => {
          if (
            String(playlist.id) !==
            String(playlistId)
          ) {
            return playlist;
          }

          return {
            ...playlist,
            ...updates,
            updatedAt:
              new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  /*
   * Delete playlist
   */
  const deletePlaylist = useCallback(
    (playlistId) => {
      setPlaylists((current) =>
        current.filter(
          (playlist) =>
            String(playlist.id) !==
            String(playlistId)
        )
      );
    },
    []
  );

  /*
   * Add song to playlist
   */
  const addSongToPlaylist =
    useCallback(
      (playlistId, songId) => {
        setPlaylists((current) =>
          current.map((playlist) => {
            if (
              String(playlist.id) !==
              String(playlistId)
            ) {
              return playlist;
            }

            const currentSongIds =
              playlist.songIds || [];

            const alreadyAdded =
              currentSongIds.some(
                (id) =>
                  String(id) ===
                  String(songId)
              );

            if (alreadyAdded) {
              return playlist;
            }

            return {
              ...playlist,
              songIds: [
                ...currentSongIds,
                songId,
              ],
              updatedAt:
                new Date().toISOString(),
            };
          })
        );
      },
      []
    );

  /*
   * Remove song from playlist
   */
  const removeSongFromPlaylist =
    useCallback(
      (playlistId, songId) => {
        setPlaylists((current) =>
          current.map((playlist) => {
            if (
              String(playlist.id) !==
              String(playlistId)
            ) {
              return playlist;
            }

            return {
              ...playlist,
              songIds: (
                playlist.songIds || []
              ).filter(
                (id) =>
                  String(id) !==
                  String(songId)
              ),
              updatedAt:
                new Date().toISOString(),
            };
          })
        );
      },
      []
    );

  /*
   * Get songs belonging to playlist
   */
  const getPlaylistSongs =
    useCallback(
      (playlistId) => {
        const playlist =
          playlists.find(
            (item) =>
              String(item.id) ===
              String(playlistId)
          );

        if (!playlist) {
          return [];
        }

        return (playlist.songIds || [])
          .map((id) =>
            songs.find(
              (song) =>
                String(song.id) ===
                String(id)
            )
          )
          .filter(Boolean);
      },
      [playlists]
    );

  /*
   * Recently played songs
   */
  const recentSongs = useMemo(() => {
    return recentlyPlayed
      .map((id) =>
        songs.find(
          (song) =>
            String(song.id) ===
            String(id)
        )
      )
      .filter(Boolean);
  }, [recentlyPlayed]);

  /*
   * Filter + search songs
   */
  const filteredSongs = useMemo(() => {
    let result = songs;

    result = searchSongs(
      result,
      searchQuery
    );

    result = filterByGenre(
      result,
      selectedGenre
    );

    result = filterByMood(
      result,
      selectedMood
    );

    result = sortSongs(
      result,
      sortBy
    );

    return result;
  }, [
    searchQuery,
    selectedGenre,
    selectedMood,
    sortBy,
  ]);

  /*
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedMood("All");
    setSortBy("default");
  }, []);

  /*
   * Get playlist by ID
   */
  const getPlaylist = useCallback(
    (playlistId) => {
      return playlists.find(
        (playlist) =>
          String(playlist.id) ===
          String(playlistId)
      );
    },
    [playlists]
  );

  const value = useMemo(
    () => ({
      songs,

      likedSongIds,
      likedSongs,
      toggleLike,
      isLiked,

      playlists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      getPlaylist,
      getPlaylistSongs,

      recentlyPlayed,
      recentSongs,

      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      resumeSong,
      stopSong,

      volume,
      setVolume,

      searchQuery,
      setSearchQuery,

      selectedGenre,
      setSelectedGenre,

      selectedMood,
      setSelectedMood,

      sortBy,
      setSortBy,

      filteredSongs,
      clearFilters,
    }),
    [
      likedSongIds,
      likedSongs,
      toggleLike,
      isLiked,
      playlists,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      addSongToPlaylist,
      removeSongFromPlaylist,
      getPlaylist,
      getPlaylistSongs,
      recentlyPlayed,
      recentSongs,
      currentSong,
      isPlaying,
      playSong,
      pauseSong,
      resumeSong,
      stopSong,
      volume,
      searchQuery,
      selectedGenre,
      selectedMood,
      sortBy,
      filteredSongs,
      clearFilters,
    ]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context =
    useContext(MusicContext);

  if (!context) {
    throw new Error(
      "useMusic must be used inside MusicProvider."
    );
  }

  return context;
};

export default MusicContext;

export { MusicProvider };