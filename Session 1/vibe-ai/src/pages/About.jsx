import React from "react";
import {
  BrainCircuit,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "Intelligent discovery",
      text: "Discover music using mood, genre, artist and listening preferences.",
    },
    {
      icon: Heart,
      title: "Built around your taste",
      text: "Save songs and create playlists that reflect your personal taste.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy first",
      text: "Your preferences and library remain under your control.",
    },
    {
      icon: Sparkles,
      title: "Simple by design",
      text: "A clean experience keeps music discovery fast and enjoyable.",
    },
  ];

  return (
    <main className="page">
      <section className="page-header">
        <span className="eyebrow">
          About VibeAI
        </span>

        <h1>
          A smarter way to discover music.
        </h1>

        <p>
          VibeAI combines intelligent
          recommendations with your personal
          taste.
        </p>
      </section>

      <section className="feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              className="feature-card"
              key={feature.title}
            >
              <Icon size={30} />

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default About;