import React from "react";
import {
  Check,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For casual listeners",
    features: [
      "Music discovery",
      "Basic recommendations",
      "Personal playlists",
      "Liked songs",
    ],
  },
  {
    name: "Plus",
    price: "₹199",
    description: "For dedicated listeners",
    popular: true,
    features: [
      "Everything in Free",
      "Advanced AI recommendations",
      "Unlimited playlist generation",
      "Priority features",
    ],
  },
  {
    name: "Pro",
    price: "₹399",
    description: "For power users",
    features: [
      "Everything in Plus",
      "Mood intelligence",
      "Advanced analytics",
      "Early access",
    ],
  },
];

const Pricing = () => {
  return (
    <main className="page">
      <section className="page-header centered">
        <span className="eyebrow">
          <Sparkles size={15} />
          Pricing
        </span>

        <h1>
          Choose your listening experience.
        </h1>

        <p>
          Start free and upgrade when you
          want more personalized discovery.
        </p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-card ${
              plan.popular
                ? "popular"
                : ""
            }`}
            key={plan.name}
          >
            {plan.popular && (
              <span className="popular-badge">
                Most popular
              </span>
            )}

            <h2>{plan.name}</h2>

            <p>{plan.description}</p>

            <strong className="price">
              {plan.price}
              <small>/month</small>
            </strong>

            <ul>
              {plan.features.map(
                (feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                )
              )}
            </ul>

            <Link
              to="/register"
              className={`btn ${
                plan.popular
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              Get started
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Pricing;