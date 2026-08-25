import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Email and password are required."
      );

      return;
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    const user = {
      id: Date.now(),
      name: "VibeAI User",
      email,
      role: email.includes("admin")
        ? "admin"
        : "user",
    };

    localStorage.setItem(
      "vibeai_user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "vibeai_token",
      "demo-auth-token"
    );

    const destination =
      location.state?.from?.pathname ||
      "/";

    navigate(destination, {
      replace: true,
    });

    setLoading(false);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="auth-icon">
          <LogIn />
        </span>

        <h1>
          Welcome back
        </h1>

        <p>
          Sign in to continue to VibeAI.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
            />
          </label>

          <button
            disabled={loading}
            className="btn btn-primary"
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">
            Forgot password?
          </Link>

          <span>
            New here?{" "}
            <Link to="/register">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;