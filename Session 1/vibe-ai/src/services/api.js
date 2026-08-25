import { songs } from "../data/songs";
import { playlists } from "../data/playlists";
import { users } from "../data/users";

import {
  getStorage,
  setStorage,
} from "../utils/storage";

import {
  STORAGE_KEYS,
} from "../utils/constants";

/*
|--------------------------------------------------------------------------
| Simulated API
|--------------------------------------------------------------------------
|
| Backend नहीं है, इसलिए ये service layer उसी तरह काम करेगी जैसे
| production app में API service काम करती है।
|
| बाद में Node/Express backend जोड़ना हो तो components बदलने की
| जरूरत कम से कम रहेगी।
|
*/

const wait = (ms = 300) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

/*
|--------------------------------------------------------------------------
| Generic response helpers
|--------------------------------------------------------------------------
*/

const successResponse = (
  data,
  message = "Request successful"
) => ({
  success: true,
  data,
  message,
});

const errorResponse = (
  message = "Something went wrong"
) => ({
  success: false,
  data: null,
  message,
});

/*
|--------------------------------------------------------------------------
| Songs
|--------------------------------------------------------------------------
*/

export const getSongs = async () => {
  await wait(250);

  return successResponse(
    songs,
    "Songs loaded successfully"
  );
};

export const getSong = async (
  songId
) => {
  await wait(200);

  const song = songs.find(
    (item) =>
      String(item.id) ===
      String(songId)
  );

  if (!song) {
    return errorResponse(
      "Song not found"
    );
  }

  return successResponse(
    song,
    "Song loaded successfully"
  );
};

/*
|--------------------------------------------------------------------------
| Playlists
|--------------------------------------------------------------------------
*/

export const getPlaylists =
  async () => {
    await wait(250);

    const storedPlaylists =
      getStorage(
        STORAGE_KEYS.PLAYLISTS,
        null
      );

    if (
      Array.isArray(
        storedPlaylists
      )
    ) {
      return successResponse(
        storedPlaylists,
        "Playlists loaded successfully"
      );
    }

    return successResponse(
      playlists,
      "Playlists loaded successfully"
    );
  };

export const getPlaylist = async (
  playlistId
) => {
  await wait(200);

  const storedPlaylists =
    getStorage(
      STORAGE_KEYS.PLAYLISTS,
      null
    );

  const playlistList =
    Array.isArray(
      storedPlaylists
    )
      ? storedPlaylists
      : playlists;

  const playlist =
    playlistList.find(
      (item) =>
        String(item.id) ===
        String(playlistId)
    );

  if (!playlist) {
    return errorResponse(
      "Playlist not found"
    );
  }

  return successResponse(
    playlist,
    "Playlist loaded successfully"
  );
};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export const getUsers = async () => {
  await wait(200);

  const storedUsers =
    getStorage(
      STORAGE_KEYS.USERS,
      null
    );

  if (
    Array.isArray(storedUsers)
  ) {
    return successResponse(
      storedUsers,
      "Users loaded successfully"
    );
  }

  return successResponse(
    users,
    "Users loaded successfully"
  );
};

/*
|--------------------------------------------------------------------------
| Save users
|--------------------------------------------------------------------------
*/

export const saveUsers = async (
  userList
) => {
  await wait(150);

  const saved = setStorage(
    STORAGE_KEYS.USERS,
    userList
  );

  if (!saved) {
    return errorResponse(
      "Unable to save users"
    );
  }

  return successResponse(
    userList,
    "Users saved successfully"
  );
};

export default {
  getSongs,
  getSong,
  getPlaylists,
  getPlaylist,
  getUsers,
  saveUsers,
};