import { useState } from "react";
import { printZomatoConfig } from "../utils/api";

export default function Home() {
  const [showPlaylists, setShowPlaylists] = useState(false);

  const spotifyApiKey =
    process.env.NEXT_PUBLIC_SPOTIFY_API_KEY;

  console.log("Spotify API Key:", spotifyApiKey);

  printZomatoConfig();

  const playlists = [
    {
      name: "Bollywood Hits",
      songs: 25,
    },
    {
      name: "Top English Songs",
      songs: 30,
    },
    {
      name: "Chill Vibes",
      songs: 18,
    },
  ];

  return (
    <main>
      <div className="card">
        <div className="logo">♫</div>

        <h1>Spotify Playlist Viewer</h1>

        <p>
          Welcome to your Spotify Playlist Viewer
        </p>

        {!showPlaylists && (
          <button
            onClick={() => setShowPlaylists(true)}
          >
            View Playlists
          </button>
        )}

        {showPlaylists && (
          <div className="playlists">
            <h2>🎵 My Playlists</h2>

            {playlists.map((playlist) => (
              <div
                className="playlist"
                key={playlist.name}
              >
                <div>
                  <h3>{playlist.name}</h3>
                  <p>
                    {playlist.songs} songs
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowPlaylists(false)}
            >
              Hide Playlists
            </button>
          </div>
        )}
      </div>
    </main>
  );
}