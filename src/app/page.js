"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Error bro!");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-blue-400">⚡ StoryLearn AI Debugger</h1>
      
      <div className="flex gap-2 mb-8">
        <input 
          className="p-3 rounded text-black font-bold"
          placeholder="Mau belajar apa?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-green-500 px-6 py-3 rounded font-bold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Mikir..." : "GAS!"}
        </button>
      </div>

      {/* Area Hasil JSON */}
      {data && (
        <div className="w-full max-w-2xl bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">{data.title}</h2>
          <div className="space-y-4">
            {data.slides?.map((slide) => (
              <div key={slide.id} className="bg-gray-700 p-3 rounded">
                <span className="text-2xl">{slide.emoji}</span>
                <h3 className="font-bold">{slide.title}</h3>
                <p className="text-sm text-gray-300">{slide.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-900 rounded">
            <p className="font-bold">Quiz: {data.quiz?.question}</p>
          </div>
        </div>
      )}
    </div>
  );
}