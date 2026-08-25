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
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-eyebrow">
              About VibeAI
            </span>

            <h1 className="hero-title">
              A smarter way to discover music.
            </h1>

            <p className="hero-description">
              VibeAI combines intelligent
              recommendations with your personal
              taste.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="category-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="category-card"
                key={feature.title}
              >
                <div className="category-card-icon">
                  <Icon size={24} />
                </div>

                <h3 className="category-card-title">
                  {feature.title}
                </h3>

                <p className="category-card-description">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default About;