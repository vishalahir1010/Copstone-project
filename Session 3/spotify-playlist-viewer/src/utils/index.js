import { printZomatoConfig } from "../utils/api";

export default function Home() {
  const spotifyApiKey =
    process.env.NEXT_PUBLIC_SPOTIFY_API_KEY;

  console.log("Spotify API Key:", spotifyApiKey);

  printZomatoConfig();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>🎵 Spotify Playlist Viewer</h1>

      <p>
        Next.js environment variables are working.
      </p>
    </main>
  );
}