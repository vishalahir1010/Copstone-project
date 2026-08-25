import { useState } from "react";

export default function AiQuoteGenerator() {
  const [tone, setTone] = useState("inspirational");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuote = async () => {
    setLoading(true);
    setError("");
    setQuote("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate quote"
        );
      }

      setQuote(data.quote);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-card">
      <h2>AI Quote Generator</h2>

      <p>
        Choose a tone and generate a motivational quote.
      </p>

      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="inspirational">
          Inspirational
        </option>

        <option value="serious">
          Serious
        </option>

        <option value="funny">
          Funny
        </option>
      </select>

      <button
        onClick={generateQuote}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quote"}
      </button>

      {quote && (
        <div className="result">
          <h3>Generated Quote</h3>
          <p>{quote}</p>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </section>
  );
}