import {
  playlists as defaultPlaylists,
} from "../data/playlists";

import {
  STORAGE_KEYS,
} from "../utils/constants";

import {
  getStorage,
  setStorage,
} from "../utils/storage";

/*
|--------------------------------------------------------------------------
| Get playlists
|--------------------------------------------------------------------------
*/

export const getAllPlaylists =
  () => {
    const stored =
      getStorage(
        STORAGE_KEYS.PLAYLISTS,
        null
      );

    if (
      Array.isArray(stored)
    ) {
      return stored;
    }

    return defaultPlaylists;
  };

/*
|--------------------------------------------------------------------------
| Save playlists
|--------------------------------------------------------------------------
*/

const savePlaylists = (
  playlistList
) => {
  setStorage(
    STORAGE_KEYS.PLAYLISTS,
    playlistList
  );

  return playlistList;
};

/*
|--------------------------------------------------------------------------
| Get playlist by ID
|--------------------------------------------------------------------------
*/

export const getPlaylistById =
  (playlistId) => {
    const allPlaylists =
      getAllPlaylists();

    return (
      allPlaylists.find(
        (playlist) =>
          String(
            playlist.id
          ) ===
          String(playlistId)
      ) || null
    );
  };

/*
|--------------------------------------------------------------------------
| Create playlist
|--------------------------------------------------------------------------
*/

export const createPlaylist =
  ({
    name,
    description = "",
    mood = "Chill",
    songIds = [],
    cover = "",
  }) => {
    if (!name?.trim()) {
      return {
        success: false,
        message:
          "Playlist name is required.",
      };
    }

    const allPlaylists =
      getAllPlaylists();

    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: name.trim(),
      description:
        description.trim(),
      mood,
      songIds,
      cover,
      type: "user",
      createdAt:
        new Date().toISOString(),
    };

    const updated = [
      ...allPlaylists,
      newPlaylist,
    ];

    savePlaylists(updated);

    return {
      success: true,
      data: newPlaylist,
      message:
        "Playlist created successfully.",
    };
  };

/*
|--------------------------------------------------------------------------
| Update playlist
|--------------------------------------------------------------------------
*/

export const updatePlaylist =
  (
    playlistId,
    updates
  ) => {
    const allPlaylists =
      getAllPlaylists();

    const exists =
      allPlaylists.some(
        (playlist) =>
          String(
            playlist.id
          ) ===
          String(playlistId)
      );

    if (!exists) {
      return {
        success: false,
        message:
          "Playlist not found.",
      };
    }

    const updated =
      allPlaylists.map(
        (playlist) => {
          if (
            String(
              playlist.id
            ) ===
            String(playlistId)
          ) {
            return {
              ...playlist,
              ...updates,
            };
          }

          return playlist;
        }
      );

    savePlaylists(updated);

    return {
      success: true,
      data: getPlaylistById(
        playlistId
      ),
      message:
        "Playlist updated successfully.",
    };
  };

/*
|--------------------------------------------------------------------------
| Delete playlist
|--------------------------------------------------------------------------
*/

export const deletePlaylist =
  (playlistId) => {
    const allPlaylists =
      getAllPlaylists();

    const updated =
      allPlaylists.filter(
        (playlist) =>
          String(
            playlist.id
          ) !==
          String(playlistId)
      );

    if (
      updated.length ===
      allPlaylists.length
    ) {
      return {
        success: false,
        message:
          "Playlist not found.",
      };
    }

    savePlaylists(updated);

    return {
      success: true,
      data: updated,
      message:
        "Playlist deleted successfully.",
    };
  };

/*
|--------------------------------------------------------------------------
| Add song
|--------------------------------------------------------------------------
*/

export const addSongToPlaylist =
  (
    playlistId,
    songId
  ) => {
    const playlist =
      getPlaylistById(
        playlistId
      );

    if (!playlist) {
      return {
        success: false,
        message:
          "Playlist not found.",
      };
    }

    if (
      playlist.songIds.includes(
        songId
      )
    ) {
      return {
        success: false,
        message:
          "Song is already in this playlist.",
      };
    }

    return updatePlaylist(
      playlistId,
      {
        songIds: [
          ...playlist.songIds,
          songId,
        ],
      }
    );
  };

/*
|--------------------------------------------------------------------------
| Remove song
|--------------------------------------------------------------------------
*/

export const removeSongFromPlaylist =
  (
    playlistId,
    songId
  ) => {
    const playlist =
      getPlaylistById(
        playlistId
      );

    if (!playlist) {
      return {
        success: false,
        message:
          "Playlist not found.",
      };
    }

    const updatedSongIds =
      playlist.songIds.filter(
        (id) =>
          String(id) !==
          String(songId)
      );

    return updatePlaylist(
      playlistId,
      {
        songIds:
          updatedSongIds,
      }
    );
  };