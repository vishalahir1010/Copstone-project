export async function fetchBlogSummary(prompt) {
  const response = await fetch(
    "http://localhost:5000/api/blog-summary",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Failed to generate blog summary."
    );
  }

  return data.summary;
}