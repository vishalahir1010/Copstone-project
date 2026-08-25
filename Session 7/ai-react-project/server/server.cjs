const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

/* =========================
   HUGGING FACE QUOTE
========================= */

app.post("/api/quote", async (req, res) => {
  try {
    const { tone } = req.body;

    const prompt = `
Generate one short motivational quote.

Tone: ${tone}

Return only the quote.
Do not add explanations.
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai-community/gpt2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 50,
            temperature: 0.8,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "Hugging Face request failed",
      });
    }

    let quote = "";

    if (Array.isArray(data) && data[0]?.generated_text) {
      quote = data[0].generated_text;
    }

    res.json({
      quote,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to generate quote.",
    });
  }
});

/* =========================
   OPENAI RESUME SUMMARY
========================= */

app.post("/api/resume-summary", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume || !resume.trim()) {
      return res.status(400).json({
        error: "Resume details are required.",
      });
    }

    const prompt = `
Create a professional resume summary in exactly 2 lines.

Resume details:
${resume}

Return only the 2-line summary.
`;

    const response = await fetch(
      "https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt,
          max_tokens: 100,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.message ||
          "OpenAI request failed.",
      });
    }

    const summary =
      data.choices?.[0]?.text?.trim();

    res.json({
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to generate resume summary.",
    });
  }
});

/* =========================
   BLOG SUMMARY
========================= */

async function fetchBlogSummary(prompt) {
  const response = await fetch(
    "https://api.openai.com/v1/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Summarize this blog in a short paragraph:\n\n${prompt}`,
        max_tokens: 150,
        temperature: 0.5,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        "Blog summary request failed."
    );
  }

  return data.choices?.[0]?.text?.trim();
}

app.post("/api/blog-summary", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: "Blog content is required.",
      });
    }

    const summary = await fetchBlogSummary(prompt);

    res.json({
      summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});