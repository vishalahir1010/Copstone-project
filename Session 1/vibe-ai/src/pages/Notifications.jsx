import React from "react";
import {
  Bell,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Your weekly mix is ready",
    text: "We found fresh tracks based on your listening habits.",
    time: "Today",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Playlist created",
    text: "Your recent AI playlist is ready to explore.",
    time: "Yesterday",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "New recommendations",
    text: "There are new songs waiting in Discover.",
    time: "3 days ago",
    icon: Bell,
  },
];

const Notifications = () => {
  return (
    <main className="page">
      <section className="page-header">
        <span className="eyebrow">
          Inbox
        </span>

        <h1>
          Notifications
        </h1>
      </section>

      <div className="notification-list">
        {notifications.map(
          (notification) => {
            const Icon =
              notification.icon;

            return (
              <article
                className="notification-item"
                key={notification.id}
              >
                <span>
                  <Icon size={19} />
                </span>

                <div>
                  <h3>
                    {notification.title}
                  </h3>

                  <p>
                    {notification.text}
                  </p>
                </div>

                <time>
                  {notification.time}
                </time>
              </article>
            );
          }
        )}
      </div>
    </main>
  );
};

export default Notifications;