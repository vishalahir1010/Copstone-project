export const playlists = [
  {
    id: "playlist-1",
    name: "Late Night Vibes",
    description:
      "Smooth tracks for quiet nights and long drives.",
    mood: "Late Night",
    songIds: [
      1,
      9,
      16,
      19,
      26,
      29,
    ],
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    type: "curated",
  },

  {
    id: "playlist-2",
    name: "Feel Good",
    description:
      "Bright and uplifting songs for a better day.",
    mood: "Happy",
    songIds: [
      2,
      6,
      12,
      17,
      20,
      30,
    ],
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    type: "curated",
  },

  {
    id: "playlist-3",
    name: "Deep Focus",
    description:
      "Music to help you concentrate and stay productive.",
    mood: "Focus",
    songIds: [
      24,
      14,
      15,
      27,
    ],
    cover:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    type: "curated",
  },

  {
    id: "playlist-4",
    name: "Chill Mode",
    description:
      "Relaxed music for slow afternoons and peaceful evenings.",
    mood: "Chill",
    songIds: [
      3,
      5,
      21,
      22,
      25,
    ],
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    type: "curated",
  },

  {
    id: "playlist-5",
    name: "Energy Boost",
    description:
      "High-energy tracks to get you moving.",
    mood: "Energetic",
    songIds: [
      4,
      7,
      13,
      14,
      15,
      18,
      23,
      27,
    ],
    cover:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    type: "curated",
  },
];

export const getPlaylistById = (
  id
) => {
  return playlists.find(
    (playlist) =>
      String(playlist.id) ===
      String(id)
  );
};

export default playlists;