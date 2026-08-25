import React from "react";
import {
  Link,
  Outlet,
} from "react-router-dom";

import { Music2 } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <Link to="/">
          <span className="auth-logo">
            <Music2 size={23} />
          </span>

          <strong>VibeAI</strong>
        </Link>

        <p>
          Your mood.
          <br />
          Your music.
        </p>
      </div>

      <div className="auth-content">
        <Outlet />
      </div>

      <div className="auth-footer">
        © {new Date().getFullYear()} VibeAI
      </div>
    </div>
  );
};

export default AuthLayout;