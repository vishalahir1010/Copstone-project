import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

  const [sent, setSent] =
    useState(false);

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !/^\S+@\S+\.\S+$/.test(
        email
      )
    ) {
      setError(
        "Enter a valid email address."
      );

      return;
    }

    setError("");
    setSent(true);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="auth-icon">
          <KeyRound />
        </span>

        <h1>
          Reset your password
        </h1>

        <p>
          Enter your email to receive
          reset instructions.
        </p>

        {sent ? (
          <div className="success-box">
            If an account exists for this
            email, reset instructions have
            been sent.
          </div>
        ) : (
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

              {error && (
                <small className="field-error">
                  {error}
                </small>
              )}
            </label>

            <button className="btn btn-primary">
              Send reset link
            </button>
          </form>
        )}

        <Link to="/login">
          Back to login
        </Link>
      </div>
    </main>
  );
};

export default ForgotPassword;