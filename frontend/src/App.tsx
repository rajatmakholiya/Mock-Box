import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export default function App() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.questions) {
        throw new Error("No questions returned from the server.");
      }

      setQuestions(data.questions);
    } catch (err: unknown) {
      console.error("Error:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold shadow">
        MockTest AI
      </header>

      <main className="p-6">
        {/* Topic Form */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 w-full max-w-xl mx-auto p-4"
        >
          <input
            type="text"
            placeholder="Enter a topic (e.g., React, History)..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Questions */}
        <div className="mt-6 grid gap-4 max-w-3xl mx-auto">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <h3 className="font-semibold text-lg mb-2">
                {q.id}. {q.question}
              </h3>
              <ul className="space-y-1">
                {q.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
              <details className="mt-3 text-sm text-gray-600">
                <summary className="cursor-pointer font-medium">
                  Show Answer
                </summary>
                <p className="mt-1">✅ Correct: {q.correct_answer}</p>
                {q.explanation && <p className="italic">{q.explanation}</p>}
              </details>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}