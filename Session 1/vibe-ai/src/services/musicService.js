import { songs } from "../data/songs";

import {
  searchSongs,
  filterByGenre,
  filterByMood,
  sortSongs,
  generateAIPlaylist,
} from "../utils/musicUtils";

import {
  getStorageArray,
  setStorage,
} from "../utils/storage";

import {
  STORAGE_KEYS,
} from "../utils/constants";

/*
|--------------------------------------------------------------------------
| Song search
|--------------------------------------------------------------------------
*/

export const searchMusic = async ({
  query = "",
  genre = "All",
  mood = "All",
  sortBy = "default",
} = {}) => {
  let result = [...songs];

  result = searchSongs(
    result,
    query
  );

  result = filterByGenre(
    result,
    genre
  );

  result = filterByMood(
    result,
    mood
  );

  result = sortSongs(
    result,
    sortBy
  );

  return {
    success: true,
    data: result,
    message:
      "Search completed.",
  };
};

/*
|--------------------------------------------------------------------------
| Get song
|--------------------------------------------------------------------------
*/

export const getSongById =
  async (songId) => {
    const song =
      songs.find(
        (item) =>
          String(item.id) ===
          String(songId)
      );

    if (!song) {
      return {
        success: false,
        data: null,
        message:
          "Song not found.",
      };
    }

    return {
      success: true,
      data: song,
      message:
        "Song loaded successfully.",
    };
  };

/*
|--------------------------------------------------------------------------
| Recently played
|--------------------------------------------------------------------------
*/

export const getRecentlyPlayed =
  () => {
    return getStorageArray(
      STORAGE_KEYS.RECENTLY_PLAYED
    );
  };

export const addRecentlyPlayed =
  (song) => {
    if (!song) {
      return;
    }

    const current =
      getRecentlyPlayed();

    const filtered =
      current.filter(
        (item) =>
          item.id !== song.id
      );

    const updated = [
      song,
      ...filtered,
    ].slice(0, 10);

    setStorage(
      STORAGE_KEYS.RECENTLY_PLAYED,
      updated
    );

    return updated;
  };

/*
|--------------------------------------------------------------------------
| Liked songs
|--------------------------------------------------------------------------
*/

export const getLikedSongs =
  () => {
    return getStorageArray(
      STORAGE_KEYS.LIKED_SONGS
    );
  };

export const isSongLiked = (
  songId
) => {
  const liked =
    getLikedSongs();

  return liked.some(
    (song) =>
      String(song.id) ===
      String(songId)
  );
};

export const toggleLikedSong =
  (song) => {
    if (!song) {
      return {
        liked: false,
        songs: getLikedSongs(),
      };
    }

    const liked =
      getLikedSongs();

    const alreadyLiked =
      liked.some(
        (item) =>
          item.id === song.id
      );

    let updated;

    if (alreadyLiked) {
      updated = liked.filter(
        (item) =>
          item.id !== song.id
      );
    } else {
      updated = [
        ...liked,
        song,
      ];
    }

    setStorage(
      STORAGE_KEYS.LIKED_SONGS,
      updated
    );

    return {
      liked: !alreadyLiked,
      songs: updated,
    };
  };

/*
|--------------------------------------------------------------------------
| AI Playlist
|--------------------------------------------------------------------------
*/

export const createAIPlaylist =
  ({
    mood,
    genre,
    songCount = 10,
  }) => {
    const generated =
      generateAIPlaylist({
        songList: songs,
        mood,
        genre,
        duration: songCount,
      });

    return {
      success: true,
      data: generated,
      message:
        "AI playlist generated successfully.",
    };
  };