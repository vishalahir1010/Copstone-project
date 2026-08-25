import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlaylistContext = createContext(null);

const STORAGE_KEY = "vibeai_playlists";

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState(() => {
    try {
      const savedPlaylists =
        localStorage.getItem(STORAGE_KEY);

      return savedPlaylists
        ? JSON.parse(savedPlaylists)
        : [];
    } catch (error) {
      console.error(
        "Failed to load playlists:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(playlists)
    );
  }, [playlists]);

  // Get playlist by ID
  const getPlaylistById = (playlistId) => {
    return playlists.find(
      (playlist) =>
        String(playlist.id) === String(playlistId)
    );
  };

  // Create playlist
  const createPlaylist = (playlistData) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name:
        playlistData.name || "Untitled Playlist",
      description:
        playlistData.description || "",
      cover: playlistData.cover || "",
      mood: playlistData.mood || "",
      genre: playlistData.genre || "",
      aiGenerated:
        playlistData.aiGenerated || false,
      songIds: playlistData.songIds || [],
      createdAt: new Date().toISOString(),
    };

    setPlaylists((current) => [
      ...current,
      newPlaylist,
    ]);

    return newPlaylist;
  };

  // Delete playlist
  const deletePlaylist = (playlistId) => {
    setPlaylists((current) =>
      current.filter(
        (playlist) =>
          String(playlist.id) !==
          String(playlistId)
      )
    );
  };

  // Add song to playlist
  const addSongToPlaylist = (
    playlistId,
    songId
  ) => {
    setPlaylists((current) =>
      current.map((playlist) => {
        if (
          String(playlist.id) !==
          String(playlistId)
        ) {
          return playlist;
        }

        if (
          playlist.songIds.some(
            (id) =>
              String(id) === String(songId)
          )
        ) {
          return playlist;
        }

        return {
          ...playlist,
          songIds: [
            ...playlist.songIds,
            songId,
          ],
        };
      })
    );
  };

  // Remove song from playlist
  const removeSongFromPlaylist = (
    playlistId,
    songId
  ) => {
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
          songIds: playlist.songIds.filter(
            (id) =>
              String(id) !== String(songId)
          ),
        };
      })
    );
  };

  const value = {
    playlists,
    createPlaylist,
    getPlaylistById,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

// IMPORTANT: This is the missing export
export const usePlaylists = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "usePlaylists must be used inside PlaylistProvider"
    );
  }

  return context;
};

export default PlaylistContext;
