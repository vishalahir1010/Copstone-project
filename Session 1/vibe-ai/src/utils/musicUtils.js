/**
 * Search songs by title, artist,
 * album, genre or mood.
 */
export const searchSongs = (
  songList = [],
  query = ""
) => {
  const normalizedQuery =
    query.trim().toLowerCase();

  if (!normalizedQuery) {
    return songList;
  }

  return songList.filter((song) => {
    const searchableText = [
      song.title,
      song.artist,
      song.album,
      song.genre,
      song.mood,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      normalizedQuery
    );
  });
};

/**
 * Filter songs by genre.
 */
export const filterByGenre = (
  songList = [],
  genre = "All"
) => {
  if (!genre || genre === "All") {
    return songList;
  }

  return songList.filter(
    (song) =>
      song.genre?.toLowerCase() ===
      genre.toLowerCase()
  );
};

/**
 * Filter songs by mood.
 */
export const filterByMood = (
  songList = [],
  mood = "All"
) => {
  if (!mood || mood === "All") {
    return songList;
  }

  return songList.filter(
    (song) =>
      song.mood?.toLowerCase() ===
      mood.toLowerCase()
  );
};

/**
 * Sort songs.
 */
export const sortSongs = (
  songList = [],
  sortBy = "default"
) => {
  const result = [...songList];

  switch (sortBy) {
    case "name-asc":
      return result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "name-desc":
      return result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    case "rating":
      return result.sort(
        (a, b) =>
          (b.rating || 0) -
          (a.rating || 0)
      );

    case "plays":
      return result.sort(
        (a, b) =>
          (b.plays || 0) -
          (a.plays || 0)
      );

    case "newest":
      return result.sort(
        (a, b) =>
          (b.year || 0) -
          (a.year || 0)
      );

    case "oldest":
      return result.sort(
        (a, b) =>
          (a.year || 0) -
          (b.year || 0)
      );

    default:
      return result;
  }
};

/**
 * Get unique genres.
 */
export const getGenres = (
  songList = []
) => {
  return [
    "All",
    ...new Set(
      songList
        .map((song) => song.genre)
        .filter(Boolean)
    ),
  ];
};

/**
 * Get unique moods.
 */
export const getMoods = (
  songList = []
) => {
  return [
    "All",
    ...new Set(
      songList
        .map((song) => song.mood)
        .filter(Boolean)
    ),
  ];
};

/**
 * Format large play counts.
 *
 * Example:
 * 1254300 -> 1.25M
 */
export const formatNumber = (
  number = 0
) => {
  if (number >= 1000000000) {
    return `${(
      number / 1000000000
    ).toFixed(1)}B`;
  }

  if (number >= 1000000) {
    return `${(
      number / 1000000
    ).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(
      number / 1000
    ).toFixed(1)}K`;
  }

  return String(number);
};

/**
 * Convert seconds to MM:SS.
 */
export const formatDuration = (
  seconds = 0
) => {
  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    Math.floor(seconds % 60);

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

/**
 * Convert "MM:SS" into seconds.
 */
export const durationToSeconds = (
  duration = "0:00"
) => {
  const parts = duration.split(":");

  if (parts.length !== 2) {
    return 0;
  }

  const minutes = Number(parts[0]);
  const seconds = Number(parts[1]);

  if (
    Number.isNaN(minutes) ||
    Number.isNaN(seconds)
  ) {
    return 0;
  }

  return (
    minutes * 60 + seconds
  );
};

/**
 * Get songs for a specific mood.
 */
export const getSongsByMood = (
  songList = [],
  mood
) => {
  return filterByMood(
    songList,
    mood
  );
};

/**
 * Get songs for a specific genre.
 */
export const getSongsByGenre = (
  songList = [],
  genre
) => {
  return filterByGenre(
    songList,
    genre
  );
};

/**
 * Get top-rated songs.
 */
export const getTopRatedSongs = (
  songList = [],
  limit = 6
) => {
  return [...songList]
    .sort(
      (a, b) =>
        (b.rating || 0) -
        (a.rating || 0)
    )
    .slice(0, limit);
};

/**
 * Get most played songs.
 */
export const getMostPlayedSongs = (
  songList = [],
  limit = 6
) => {
  return [...songList]
    .sort(
      (a, b) =>
        (b.plays || 0) -
        (a.plays || 0)
    )
    .slice(0, limit);
};

/**
 * Get featured songs.
 */
export const getFeaturedSongs = (
  songList = [],
  limit = 6
) => {
  return songList
    .filter((song) => song.featured)
    .slice(0, limit);
};

/**
 * Simple AI-style playlist generator.
 *
 * This is frontend recommendation logic,
 * not a real external AI API.
 */
export const generateAIPlaylist = ({
  songList = [],
  mood = "Chill",
  genre = "All",
  duration = 10,
} = {}) => {
  let result = [...songList];

  if (mood && mood !== "All") {
    result = filterByMood(
      result,
      mood
    );
  }

  if (genre && genre !== "All") {
    result = filterByGenre(
      result,
      genre
    );
  }

  /*
   * Higher-rated songs are prioritized.
   */
  result.sort(
    (a, b) =>
      (b.rating || 0) -
      (a.rating || 0)
  );

  /*
   * Add a small popularity factor.
   */
  result.sort((a, b) => {
    const scoreA =
      (a.rating || 0) * 0.7 +
      Math.min(
        (a.plays || 0) / 1000000,
        5
      ) *
        0.3;

    const scoreB =
      (b.rating || 0) * 0.7 +
      Math.min(
        (b.plays || 0) / 1000000,
        5
      ) *
        0.3;

    return scoreB - scoreA;
  });

  return result.slice(
    0,
    Math.max(1, duration)
  );
};

/**
 * Shuffle songs.
 */
export const shuffleSongs = (
  songList = []
) => {
  const result = [...songList];

  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      result[i],
      result[randomIndex],
    ] = [
      result[randomIndex],
      result[i],
    ];
  }

  return result;
};

/**
 * Remove duplicate songs.
 */
export const uniqueSongs = (
  songList = []
) => {
  const seen = new Set();

  return songList.filter((song) => {
    if (seen.has(song.id)) {
      return false;
    }

    seen.add(song.id);

    return true;
  });
};