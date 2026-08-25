export const APP_NAME = "VibeAI";

export const ROUTES = {
  HOME: "/",
  DISCOVER: "/discover",
  SEARCH: "/search",
  PLAYLISTS: "/playlists",
  CREATE_PLAYLIST: "/playlists/create",

  ABOUT: "/about",
  PRICING: "/pricing",
  FAQ: "/faq",
  CONTACT: "/contact",

  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  PROFILE: "/profile",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  LIKED_SONGS: "/liked",

  NOT_FOUND: "*",
};

export const STORAGE_KEYS = {
  USER: "vibeai_user",
  TOKEN: "vibeai_token",
  USERS: "vibeai_users",
  LIKED_SONGS: "vibeai_liked_songs",
  PLAYLISTS: "vibeai_playlists",
  RECENTLY_PLAYED: "vibeai_recently_played",
  THEME: "vibeai_theme",
  MUSIC_SETTINGS: "vibeai_music_settings",
  NOTIFICATIONS: "vibeai_notifications",
};

export const GENRES = [
  "All",
  "Pop",
  "R&B",
  "Rock",
  "Pop Rock",
  "Alternative",
  "Dance",
  "EDM",
  "Hip Hop",
  "Afrobeats",
  "Acoustic",
];

export const MOODS = [
  "All",
  "Happy",
  "Chill",
  "Relax",
  "Energetic",
  "Late Night",
  "Focus",
];

export const SORT_OPTIONS = [
  {
    value: "default",
    label: "Recommended",
  },
  {
    value: "name-asc",
    label: "Name A-Z",
  },
  {
    value: "name-desc",
    label: "Name Z-A",
  },
  {
    value: "rating",
    label: "Highest Rated",
  },
  {
    value: "plays",
    label: "Most Played",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

export const PLAYLIST_MOODS = [
  "Chill",
  "Happy",
  "Energetic",
  "Focus",
  "Late Night",
  "Relax",
];

export const NAV_ITEMS = [
  {
    label: "Home",
    path: ROUTES.HOME,
  },
  {
    label: "Discover",
    path: ROUTES.DISCOVER,
  },
  {
    label: "Playlists",
    path: ROUTES.PLAYLISTS,
  },
];

export const FOOTER_LINKS = {
  product: [
    {
      label: "Discover",
      path: ROUTES.DISCOVER,
    },
    {
      label: "Playlists",
      path: ROUTES.PLAYLISTS,
    },
    {
      label: "Pricing",
      path: ROUTES.PRICING,
    },
  ],

  company: [
    {
      label: "About",
      path: ROUTES.ABOUT,
    },
    {
      label: "Contact",
      path: ROUTES.CONTACT,
    },
    {
      label: "FAQ",
      path: ROUTES.FAQ,
    },
  ],

  account: [
    {
      label: "Profile",
      path: ROUTES.PROFILE,
    },
    {
      label: "Settings",
      path: ROUTES.SETTINGS,
    },
    {
      label: "Liked Songs",
      path: ROUTES.LIKED_SONGS,
    },
  ],
};

export const TOAST_DURATION = 3000;

export const DEFAULT_VOLUME = 80;

export const MAX_RECENT_SONGS = 10;

export const MAX_SEARCH_RESULTS = 50;