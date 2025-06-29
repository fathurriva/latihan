export default async function handler(req, res) {
  // ✅ Tambahkan CORS agar bisa diakses dari frontend lokal
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Tangani preflight request dari browser
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ Tolak selain POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { materi, jumlah } = req.body;

  if (!materi || materi.trim() === "") {
    return res.status(400).json({ error: "No materi provided" });
  }

  try {
    // 🔁 Kirim ke proxy saya yang sudah siap tanpa API key
    const proxyResponse = await fetch("https://ai-fathur.vercel.app/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ materi, jumlah: jumlah || 5 })
    });

    const result = await proxyResponse.json();

    if (!result || !result.questions) {
      throw new Error("Format jawaban dari proxy tidak sesuai");
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("❌ Gagal ambil soal dari proxy:", err);
    return res.status(500).json({ error: "Gagal mengambil soal dari AI proxy" });
  }
}
