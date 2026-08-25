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
        <div className="sidebar-inner">
          <div className="sidebar-section">
            <span className="sidebar-title">
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
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <span className="sidebar-link-icon">
                    <Icon size={19} />
                  </span>
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="sidebar-section">
            <span className="sidebar-title">
              PLAYLISTS
            </span>

            <button
              className="sidebar-link"
              onClick={() => navigate("/library")}
            >
              Daily Focus
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/library")}
            >
              Night Drive
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/library")}
            >
              Weekend Energy
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/library")}
            >
              Coding Session
            </button>
          </div>

          <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <NavLink
              to="/profile"
              className="sidebar-link"
              onClick={onClose}
            >
              <span className="sidebar-link-icon">
                <User size={19} />
              </span>
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/settings"
              className="sidebar-link"
              onClick={onClose}
            >
              <span className="sidebar-link-icon">
                <Settings size={19} />
              </span>
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;