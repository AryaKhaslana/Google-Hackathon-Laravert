import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { topic } = body;
    
    // Pastiin API Key aman
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // PROMPT RAHASIA: Memaksa Gemini jadi API JSON
    const prompt = `
      Kamu adalah guru yang asik. Buatkan materi belajar tentang "${topic}".
      Pecah materi menjadi 5 slide pendek yang seru.
      Slide terakhir (ke-5) HARUS berupa Kuis Pilihan Ganda.
      
      PENTING: Jawab HANYA dalam format JSON murni. Jangan pake markdown.
      Strukturnya harus persis seperti ini:
      {
        "title": "Judul Materi yang Seru",
        "slides": [
          {
            "id": 1,
            "title": "Judul Slide 1",
            "content": "Penjelasan singkat (maks 2 kalimat)...",
            "emoji": "🚀"
          },
          {
            "id": 2,
            "title": "Judul Slide 2",
            "content": "Penjelasan singkat...",
            "emoji": "💡"
          },
          {
            "id": 3,
            "title": "Judul Slide 3",
            "content": "Penjelasan singkat...",
            "emoji": "🔥"
          },
          {
            "id": 4,
            "title": "Judul Slide 4",
            "content": "Penjelasan singkat...",
            "emoji": "🤔"
          }
        ],
        "quiz": {
          "question": "Pertanyaan kuis...",
          "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
          "correct_answer": "Pilihan A"
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Bersihin kalau Gemini bandel kasih markdown ```json
    let text = response.text();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return NextResponse.json(JSON.parse(text));
    
  } catch (error) {
    console.error("ERROR BACKEND:", error);
    return NextResponse.json({ error: "Gagal generate JSON", detail: error.message }, { status: 500 });
  }
}