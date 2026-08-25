import React, { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  User,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout, onMenuClick }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">♫</span>
          <span>VibeAI</span>
        </Link>
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <Search size={18} />

        <input
          type="search"
          placeholder="Search songs, artists, playlists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
      </form>

      <div className="navbar-actions">
        <button
          className="navbar-icon-button"
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        {user ? (
          <div className="profile-menu-wrapper">
            <button
              className="navbar-profile"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <User size={18} />
              )}
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile">
                  <User size={17} />
                  Profile
                </Link>

                <Link to="/settings">
                  Settings
                </Link>

                <button onClick={onLogout}>
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;