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
      <div className="navbar-container">
        <button
          className="navbar-toggle"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">♫</span>
          <span>VibeAI</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <Search size={18} className="search-bar-icon" />

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
            className="btn btn-icon btn-ghost"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          {user ? (
            <div className="dropdown">
              <button
                className="avatar"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <User size={18} />
                )}
              </button>

              {profileOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <User size={17} />
                    Profile
                  </Link>

                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>

                  <button className="dropdown-item" onClick={onLogout}>
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
      </div>
    </header>
  );
};

export default Navbar;