import { useState, useEffect } from "react";

// Define the structure for a single question
interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

// A simple loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// The main App component
export default function App() {
  // State management
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // Effect to apply the theme class to the HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle form submission to generate questions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.questions) throw new Error("No questions returned from the server.");
      setQuestions(data.questions);
    } catch (err: unknown) {
      console.error("Error:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">MockTest AI</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Topic Input Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter a topic (e.g., React, History)..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-grow p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-transform transform hover:scale-105"
            >
              {loading ? <Spinner /> : "Generate"}
            </button>
          </form>
        </div>

        {/* Display Area for Errors, Loading, and Questions */}
        <div className="mt-8 max-w-3xl mx-auto">
          {loading && <Spinner />}
          {error && <p className="text-red-500 text-center bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}
          
          {!loading && !error && questions.length > 0 && (
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg mb-4">
                    {q.id}. {q.question}
                  </h3>
                  <ul className="space-y-2">
                    {q.options.map((opt, idx) => (
                      <li key={idx} className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border border-gray-300 dark:border-gray-600">
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <details className="mt-4 group">
                    <summary className="cursor-pointer font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      Show Answer
                    </summary>
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
                      <p className="font-bold">✅ Correct: {q.correct_answer}</p>
                      {q.explanation && <p className="italic mt-2 text-gray-600 dark:text-gray-400">{q.explanation}</p>}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
          
          {!loading && questions.length === 0 && (
             <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Enter a topic above to generate your mock test!</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}