import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "All fields are required."
      );

      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    const user = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: "user",
    };

    localStorage.setItem(
      "vibeai_user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "vibeai_token",
      "demo-auth-token"
    );

    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="auth-icon">
          <UserPlus />
        </span>

        <h1>
          Create your account
        </h1>

        <p>
          Start building playlists
          around your taste.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Name

            <input
              value={form.name}
              onChange={(event) =>
                handleChange(
                  "name",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Email

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                handleChange(
                  "email",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                handleChange(
                  "password",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Confirm password

            <input
              type="password"
              value={
                form.confirmPassword
              }
              onChange={(event) =>
                handleChange(
                  "confirmPassword",
                  event.target.value
                )
              }
            />
          </label>

          <button className="btn btn-primary">
            Create account
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;