import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Music,
  Settings,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    React.useState(false);

  const [collapsed, setCollapsed] =
    React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Songs",
      path: "/admin/songs",
      icon: Music,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={`admin-layout ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* Mobile overlay */}

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "mobile-sidebar-open"
            : ""
        }`}
      >
        <div className="admin-sidebar-header">
          <button
            type="button"
            className="admin-logo"
            onClick={() =>
              navigate("/admin")
            }
            aria-label="VibeAI Admin"
          >
            <span className="admin-logo-icon">
              <Music size={20} />
            </span>

            {!collapsed && (
              <span className="admin-logo-text">
                VibeAI
              </span>
            )}
          </button>

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav
          className="admin-navigation"
          aria-label="Admin navigation"
        >
          <div className="admin-navigation-title">
            {!collapsed && "MAIN MENU"}
          </div>

          {navigationItems.map(
            ({
              label,
              path,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={({ isActive }) =>
                  `admin-nav-link ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
                title={
                  collapsed
                    ? label
                    : undefined
                }
              >
                <Icon size={19} />

                {!collapsed && (
                  <span>{label}</span>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* Sidebar bottom */}

        <div className="admin-sidebar-bottom">
          <button
            type="button"
            className="admin-nav-link"
            onClick={() =>
              navigate("/admin/settings")
            }
            title={
              collapsed
                ? "Settings"
                : undefined
            }
          >
            <Settings size={19} />

            {!collapsed && (
              <span>Settings</span>
            )}
          </button>

          <button
            type="button"
            className="admin-nav-link admin-logout-button"
            onClick={handleLogout}
            title={
              collapsed
                ? "Logout"
                : undefined
            }
          >
            <LogOut size={19} />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="admin-main">
        {/* Topbar */}

        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              className="admin-collapse-button"
              onClick={() =>
                setCollapsed(
                  (previous) =>
                    !previous
                )
              }
              aria-label={
                collapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              {collapsed ? (
                <ChevronRight
                  size={20}
                />
              ) : (
                <ChevronLeft
                  size={20}
                />
              )}
            </button>

            <div className="admin-page-heading">
              <span className="admin-page-eyebrow">
                ADMIN PANEL
              </span>

              <h1>VibeAI Dashboard</h1>
            </div>
          </div>

          {/* Topbar right */}

          <div className="admin-topbar-right">
            <button
              type="button"
              className="admin-notification-button"
              onClick={() =>
                navigate(
                  "/admin/notifications"
                )
              }
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span className="notification-dot" />
            </button>

            <div className="admin-user">
              <div className="admin-user-avatar">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "A"}
              </div>

              <div className="admin-user-info">
                <strong>
                  {user?.name ||
                    "Administrator"}
                </strong>

                <span>
                  {user?.role ||
                    "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;