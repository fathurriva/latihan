export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { materi, jumlah } = req.body;

  if (!materi) {
    return res.status(400).json({ error: "No materi provided" });
  }

  try {
    const response = await fetch("https://ai-fathur.vercel.app/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ materi, jumlah }),
    });

    const data = await response.json();

    if (!data || !data.questions) {
      return res.status(500).json({ error: "Invalid response from AI" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    return res.status(500).json({ error: "AI proxy failed" });
  }
}
