/**
 * Safely read JSON from localStorage.
 */
export const getStorage = (
  key,
  fallback = null
) => {
  try {
    const value =
      localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      `Failed to read localStorage key: ${key}`,
      error
    );

    return fallback;
  }
};

/**
 * Safely save JSON to localStorage.
 */
export const setStorage = (
  key,
  value
) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      `Failed to save localStorage key: ${key}`,
      error
    );

    return false;
  }
};

/**
 * Remove a localStorage item.
 */
export const removeStorage = (
  key
) => {
  try {
    localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.error(
      `Failed to remove localStorage key: ${key}`,
      error
    );

    return false;
  }
};

/**
 * Clear all VibeAI localStorage data.
 */
export const clearAppStorage = () => {
  const keys = [
    "vibeai_user",
    "vibeai_token",
    "vibeai_users",
    "vibeai_liked_songs",
    "vibeai_playlists",
    "vibeai_recently_played",
    "vibeai_theme",
    "vibeai_music_settings",
    "vibeai_notifications",
  ];

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

/**
 * Check whether a key exists.
 */
export const hasStorage = (
  key
) => {
  try {
    return (
      localStorage.getItem(key) !==
      null
    );
  } catch {
    return false;
  }
};

/**
 * Get stored array.
 */
export const getStorageArray = (
  key
) => {
  const value = getStorage(
    key,
    []
  );

  return Array.isArray(value)
    ? value
    : [];
};

/**
 * Get stored object.
 */
export const getStorageObject = (
  key,
  fallback = {}
) => {
  const value = getStorage(
    key,
    fallback
  );

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value;
  }

  return fallback;
};