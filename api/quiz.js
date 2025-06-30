export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { materi, jumlah } = req.body;
  if (!materi || !jumlah) return res.status(400).json({ error: "Parameter tidak lengkap." });

  const kalimatList = materi
    .split(/[.?!]/)
    .map(k => k.trim())
    .filter(k => k.length > 30);

  const templates = [
    (k) => `Apa makna dari kalimat: "${k.slice(0, 80)}..."?`,
    (k) => `Apa dampak dari pernyataan: "${k.slice(0, 80)}..."?`,
    (k) => `Mengapa pernyataan ini penting: "${k.slice(0, 80)}..."?`,
    (k) => `Apa inti dari kalimat berikut: "${k.slice(0, 80)}..."?`,
    (k) => `Apa tujuan dari kalimat: "${k.slice(0, 80)}..."?`
  ];

  const dummyOptions = ["Ibadah", "Pengetahuan", "Keseimbangan", "Kemajuan", "Tanggung jawab", "Ilmuwan", "Teknologi", "Spiritual"];

  const questions = [];

  for (let i = 0; i < jumlah; i++) {
    const kalimat = kalimatList[i % kalimatList.length] || kalimatList[0];
    const template = templates[i % templates.length];

    // ✅ Ambil 1 kata dari kalimat asli untuk jawaban utama
    const kataPenting = kalimat.split(" ").filter(w => w.length > 5)[0] || "Makna";

    // ❌ Acak 3 kata lain dari daftar dummy
    const otherOptions = dummyOptions
      .filter(w => w !== kataPenting)
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, 3);

    // Gabungkan dan shuffle jika mau acak urutan (opsional)
    const options = [kataPenting, ...otherOptions];

    questions.push({
      question: template(kalimat),
      options,
      answer: 0 // masih di urutan pertama
    });
  }

  return res.status(200).json({ questions });
}




