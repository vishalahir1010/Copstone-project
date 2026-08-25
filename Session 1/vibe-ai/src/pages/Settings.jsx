import React, { useState } from "react";
import {
  Save,
  UserRound,
} from "lucide-react";

const Settings = () => {
  const user = JSON.parse(
    localStorage.getItem(
      "vibeai_user"
    ) || "{}"
  );

  const [name, setName] =
    useState(user.name || "");

  const [email, setEmail] =
    useState(user.email || "");

  const [autoplay, setAutoplay] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [saved, setSaved] =
    useState(false);

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "vibeai_user",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "vibeai_settings",
      JSON.stringify({
        autoplay,
        notifications,
      })
    );

    setSaved(true);

    setTimeout(
      () => setSaved(false),
      2000
    );
  };

  return (
    <main className="page narrow-page">
      <section className="page-header">
        <span className="eyebrow">
          <UserRound size={15} />
          Settings
        </span>

        <h1>
          Account preferences.
        </h1>
      </section>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <label>
          Display name

          <input
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />
        </label>

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

        <label className="switch-row">
          <span>
            Autoplay recommendations
          </span>

          <input
            type="checkbox"
            checked={autoplay}
            onChange={(event) =>
              setAutoplay(
                event.target.checked
              )
            }
          />
        </label>

        <label className="switch-row">
          <span>
            Notifications
          </span>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(event) =>
              setNotifications(
                event.target.checked
              )
            }
          />
        </label>

        {saved && (
          <div className="success-box">
            Settings saved.
          </div>
        )}

        <button className="btn btn-primary">
          <Save size={17} />
          Save changes
        </button>
      </form>
    </main>
  );
};

export default Settings;