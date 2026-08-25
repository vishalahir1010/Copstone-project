import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const { user } = useAuth();

  const playlists = [
    {
      id: 1,
      name: "Today's Top Hits",
      songs: 50,
      image: "https://picsum.photos/300/300?random=1",
    },
    {
      id: 2,
      name: "Chill Vibes",
      songs: 35,
      image: "https://picsum.photos/300/300?random=2",
    },
    {
      id: 3,
      name: "Workout Hits",
      songs: 42,
      image: "https://picsum.photos/300/300?random=3",
    },
  ];

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Spotify</h1>

          <p>
            Logged in as: <strong>{user?.email}</strong>
          </p>
        </div>

        <LogoutButton />

      </header>

      <main className="dashboard-content">

        <h2>Your Playlists</h2>

        <div className="playlist-grid">

          {playlists.map((playlist) => (
            <div
              className="playlist-card"
              key={playlist.id}
            >

              <img
                src={playlist.image}
                alt={playlist.name}
              />

              <h3>{playlist.name}</h3>

              <p>
                {playlist.songs} songs
              </p>

            </div>
          ))}

        </div>

      </main>

    </div>
  );
}