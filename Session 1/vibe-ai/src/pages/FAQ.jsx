import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "What is VibeAI?",
    answer:
      "VibeAI is an AI-powered music discovery and playlist creation platform.",
  },
  {
    question:
      "How are recommendations generated?",
    answer:
      "Recommendations consider attributes such as genre, mood, artist, rating and popularity.",
  },
  {
    question:
      "Can I create my own playlists?",
    answer:
      "Yes. You can create playlists manually or generate playlists using the AI mood creator.",
  },
  {
    question:
      "Can I save songs?",
    answer:
      "Yes. Use the Like button to save tracks to your personal library.",
  },
  {
    question:
      "Is there a free plan?",
    answer:
      "Yes. VibeAI provides a free plan with basic music discovery features.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] =
    useState(0);

  return (
    <main className="page narrow-page">
      <section className="page-header centered">
        <span className="eyebrow">
          Help center
        </span>

        <h1>
          Frequently asked questions.
        </h1>
      </section>

      <div className="faq-list">
        {questions.map((item, index) => (
          <article
            className={`faq-item ${
              openIndex === index
                ? "open"
                : ""
            }`}
            key={item.question}
          >
            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === index
                    ? -1
                    : index
                )
              }
            >
              <span>
                {item.question}
              </span>

              <ChevronDown size={19} />
            </button>

            {openIndex === index && (
              <p>{item.answer}</p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
};

export default FAQ;