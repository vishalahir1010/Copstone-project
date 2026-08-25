const STORAGE_KEYS = {
  cart: "designhub-cart",
  wishlist: "designhub-wishlist",
  music: "designhub-music",
  movieBooking: "designhub-movie-booking",
  rewards: "designhub-rewards",
};

export function getStorageItem(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return fallback;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error(
      `Unable to read ${key} from localStorage`,
      error
    );

    return fallback;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `Unable to save ${key} to localStorage`,
      error
    );
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Unable to remove ${key} from localStorage`,
      error
    );
  }
}

export function clearAppStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error(
      "Unable to clear application storage",
      error
    );
  }
}

export { STORAGE_KEYS };