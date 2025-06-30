export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { materi, jumlah } = req.body;

  if (!materi || !jumlah) {
    return res.status(400).json({ error: "Parameter tidak lengkap." });
  }

  const questions = [];

  for (let i = 1; i <= jumlah; i++) {
    questions.push({
      question: `Apa inti dari: ${materi.slice(0, 40)}...?`,
      options: ["Penjelasan A", "Penjelasan B", "Penjelasan C", "Penjelasan D"],
      answer: 0
    });
  }

  return res.status(200).json({ questions });
}
