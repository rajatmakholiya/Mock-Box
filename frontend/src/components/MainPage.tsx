import { useState } from "react";
import { addSavedTest } from '../lib/storage';
import type { Question, QuizStatus } from "../types";
import Spinner from "./Spinner";

export const MainPage = ({ onShowHistory }: { onShowHistory: () => void; }) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subjects, setSubjects] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('idle');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [exam, setExam] = useState("");
  const [language, setLanguage] = useState("");

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !exam.trim()) return;
    setQuizStatus('generating');
    setError("");
    setQuestions([]);
    setUserAnswers({});
    setScore(0);
    try {
      const response = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, subjects, additionalInfo, exam, language })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.questions) throw new Error("No questions returned.");
      setQuestions(data.questions);
      setQuizStatus('taking');
    } catch {
      setError("Failed to generate questions. Please try again.");
      setQuizStatus('idle');
    }
  };

  const handleStartNewTest = () => {
    setQuizStatus('idle');
    setQuestions([]);
    setTopic("");
    setDifficulty("");
    setSubjects("");
    setAdditionalInfo("");
    setError("");
    setExam("");
    setLanguage("");
  };

  const handleAnswerSelect = (questionId: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };
  
  const handleSubmitTest = () => {
    let correctAnswers = 0;
    questions.forEach(q => { if (userAnswers[q.id] === q.correct_answer) correctAnswers++; });
    setScore(correctAnswers);
    addSavedTest({ topic, questions, userAnswers, score: correctAnswers, timestamp: Date.now(), exam, language });
    setQuizStatus('submitted');
  };

  return (
    <>
      <header className="bg-white/70 dark:bg-slate-800/60 shadow-md sticky top-0 z-10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MockTest AI</h1>
          <button onClick={onShowHistory} className="font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Previous Tests</button>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border dark:border-slate-700 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
          {quizStatus === 'idle' || quizStatus === 'generating' ? (
            <form onSubmit={handleGenerateSubmit} className="space-y-4 animate-fade-in">
              <div>
                <label htmlFor="exam" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam*</label>
                <input type="text" id="exam" placeholder="e.g., 'UPSC, JEE, CET, GMAT'" value={exam} onChange={(e) => setExam(e.target.value)} required
                  className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topic*</label>
                <input type="text" id="topic" placeholder="e.g., 'History of Ancient Rome'" value={topic} onChange={(e) => setTopic(e.target.value)} required
                  className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
                  <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                    className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Any</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subjects</label>
                  <input type="text" id="subjects" placeholder="e.g., 'The Roman Republic'" value={subjects} onChange={(e) => setSubjects(e.target.value)}
                    className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Language</label>
                <input type="text" id="language" placeholder="e.g., 'Hindi, English, French, Marathi'" value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Additional Details</label>
                <textarea id="additionalInfo" placeholder="e.g., 'Focus on the Punic Wars'" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={2}
                  className="mt-1 block w-full p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button type="submit" disabled={quizStatus === 'generating' || !topic.trim() || !exam.trim()} className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center">
                {quizStatus === 'generating' ? <Spinner/> : "Generate Test"}
              </button>
            </form>
          ) : (
            <button onClick={handleStartNewTest} className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              Generate a New Test
            </button>
          )}
        </div>
        <div className="mt-8 max-w-3xl mx-auto">
          {error && <p className="text-red-500 text-center bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}

          {(quizStatus === 'taking' || quizStatus === 'reviewing') && questions.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-2xl font-bold text-center mb-4 text-slate-800 dark:text-slate-200">{quizStatus === 'reviewing' ? `Reviewing: ${topic}` : `Test: ${topic}`}</h2>
              {questions.map(q => {
                const userAnswer = userAnswers[q.id];
                const isCorrect = userAnswer === q.correct_answer;
                return (
                  <div key={q.id} className={`bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border dark:border-slate-700 shadow-md rounded-xl p-6 transition-all`}>
                    <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200">{q.id}. {q.question}</h3>
                    <ul className="space-y-2">
                      {q.options.map((opt, idx) => {
                        const isSelected = userAnswer === opt;
                        const isCorrectAnswer = q.correct_answer === opt;
                        let style = 'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700';
                        if (quizStatus === 'taking' && isSelected) style = 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-400';
                        if (quizStatus === 'reviewing') {
                          if (isCorrectAnswer) style = 'bg-green-100 dark:bg-green-900/50 border-green-500';
                          if (isSelected && !isCorrect) style = 'bg-red-100 dark:bg-red-900/50 border-red-500 line-through';
                        }
                        return (<li key={idx} onClick={() => quizStatus === 'taking' && handleAnswerSelect(q.id, opt)} className={`p-3 rounded-lg border transition-colors ${quizStatus === 'taking' ? 'cursor-pointer' : 'cursor-default'} ${style}`}>{opt}</li>);
                      })}
                    </ul>
                    {quizStatus === 'reviewing' && (
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                        <p className="font-semibold">Explanation:</p>
                        <p className="italic mt-1">{q.explanation || "No explanation provided."}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {quizStatus === 'taking' && (<button onClick={handleSubmitTest} className="w-full mt-6 px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-lg">Submit Test</button>)}
            </div>
          )}
          
          {quizStatus === 'submitted' && (
             <div className="text-center bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border dark:border-slate-700 p-8 rounded-xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Test Complete!</h2>
                <p className="text-xl mt-4 text-slate-600 dark:text-slate-300">Your Score: <span className="font-bold text-indigo-600 dark:text-indigo-400">{score} / {questions.length}</span></p>
                <button onClick={() => setQuizStatus('reviewing')} className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Review Answers</button>
             </div>
          )}
        </div>
      </main>
    </>
  );
};