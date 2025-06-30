export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { materi, jumlah } = req.body;

  if (!materi || !jumlah) {
    return res.status(400).json({ error: "Parameter tidak lengkap." });
  }

  const questions = [];

  for (let i = 0; i < jumlah; i++) {
    questions.push({
      question: `Apa yang kamu pahami tentang: ${materi.slice(0, 30)}...?`,
      options: ["A", "B", "C", "D"],
      answer: 0
    });
  }

  return res.status(200).json({ questions });
}

