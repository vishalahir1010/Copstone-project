import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <AlertTriangle size={40} />
        </div>

        <span className="eyebrow">
          Error 404
        </span>

        <h1>
          Page not found.
        </h1>

        <p>
          The page{" "}
          <strong>
            {location.pathname}
          </strong>{" "}
          doesn't exist or may have
          been moved.
        </p>

        <div className="hero-actions">
          <Link
            to="/"
            className="btn btn-primary"
          >
            Go Home
          </Link>

          <Link
            to="/discover"
            className="btn btn-secondary"
          >
            Discover Music
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;