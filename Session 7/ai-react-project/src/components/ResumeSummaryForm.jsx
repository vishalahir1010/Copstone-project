import { useState } from "react";

export default function ResumeSummaryForm() {
  const [resume, setResume] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async (e) => {
    e.preventDefault();

    if (!resume.trim()) {
      setError("Please enter your resume details.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/resume-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate summary."
        );
      }

      setSummary(data.summary);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-card">
      <h2>Resume Summary Generator</h2>

      <form onSubmit={generateSummary}>
        <textarea
          rows="8"
          placeholder="Enter your skills, education, projects and experience..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner">
              ⏳ Generating...
            </span>
          ) : (
            "Generate Summary"
          )}
        </button>
      </form>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {summary && (
        <div className="result">
          <h3>Your 2-Line Summary</h3>

          <p>{summary}</p>
        </div>
      )}
    </section>
  );
}