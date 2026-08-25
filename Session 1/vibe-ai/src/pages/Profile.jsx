import React from "react";
import {
  Edit3,
  Heart,
  ListMusic,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem(
      "vibeai_user"
    ) || "null"
  );

  const likedSongs = JSON.parse(
    localStorage.getItem(
      "vibeai_liked_songs"
    ) || "[]"
  );

  const playlists = JSON.parse(
    localStorage.getItem(
      "vibeai_playlists"
    ) || "[]"
  );

  const name =
    user?.name || "VibeAI User";

  const email =
    user?.email || "user@example.com";

  return (
    <main className="page">
      <section className="profile-hero">
        <div className="profile-avatar">
          {name
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <span className="eyebrow">
            Your profile
          </span>

          <h1>{name}</h1>

          <p>{email}</p>
        </div>

        <Link
          to="/settings"
          className="btn btn-secondary"
        >
          <Settings size={17} />
          Settings
        </Link>
      </section>

      <div className="stats-grid">
        <div>
          <Heart />

          <strong>
            {likedSongs.length}
          </strong>

          <span>
            Liked songs
          </span>
        </div>

        <div>
          <ListMusic />

          <strong>
            {playlists.length}
          </strong>

          <span>
            Playlists
          </span>
        </div>
      </div>

      <div className="quick-links">
        <Link to="/liked">
          <Heart size={17} />
          Liked songs
        </Link>

        <Link to="/playlists">
          <ListMusic size={17} />
          My playlists
        </Link>

        <Link to="/settings">
          <Edit3 size={17} />
          Edit settings
        </Link>
      </div>
    </main>
  );
};

export default Profile;