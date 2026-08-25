import React from "react";
import {
  Home,
  Compass,
  Library,
  Heart,
  Plus,
  Settings,
  User,
  X,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ open = false, onClose }) => {
  const navigate = useNavigate();

  const mainLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Discover",
      path: "/discover",
      icon: Compass,
    },
    {
      name: "My Library",
      path: "/library",
      icon: Library,
    },
    {
      name: "Liked Songs",
      path: "/liked",
      icon: Heart,
    },
  ];

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-mobile-header">
          <strong>VibeAI</strong>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-heading">
            MENU
          </span>

          {mainLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "sidebar-link-active" : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-heading-row">
            <span className="sidebar-heading">
              PLAYLISTS
            </span>

            <button
              className="sidebar-add-button"
              onClick={() => navigate("/create-playlist")}
              aria-label="Create playlist"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            className="playlist-sidebar-link"
            onClick={() => navigate("/library")}
          >
            Daily Focus
          </button>

          <button
            className="playlist-sidebar-link"
            onClick={() => navigate("/library")}
          >
            Night Drive
          </button>

          <button
            className="playlist-sidebar-link"
            onClick={() => navigate("/library")}
          >
            Weekend Energy
          </button>

          <button
            className="playlist-sidebar-link"
            onClick={() => navigate("/library")}
          >
            Coding Session
          </button>
        </div>

        <div className="sidebar-ai-card">
          <div className="sidebar-ai-icon">
            <Sparkles size={18} />
          </div>

          <h4>AI Playlist</h4>

          <p>
            Create a playlist based on your mood.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-playlist")}
          >
            Create Mix
          </button>
        </div>

        <div className="sidebar-bottom">
          <NavLink
            to="/profile"
            className="sidebar-link"
            onClick={onClose}
          >
            <User size={19} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            className="sidebar-link"
            onClick={onClose}
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;