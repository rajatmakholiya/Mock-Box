import { useState, useEffect } from "react";
import { getSavedTests } from '../lib/storage';
import type { SavedTest } from "../types";

export const PreviousTestsPage = ({ onBack }: { onBack: () => void }) => {
    const [savedTests, setSavedTests] = useState<SavedTest[]>([]);
    useEffect(() => { setSavedTests(getSavedTests()); }, []);

    return (
      <div className="container mx-auto p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Previous Tests</h2>
          <button onClick={onBack} className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            &larr; Back
          </button>
        </div>
        {savedTests.length > 0 ? (
          <div className="space-y-5">
            {savedTests.slice().reverse().map((test, index) => (
              <details key={index} className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border dark:border-slate-700 shadow-lg rounded-xl p-6 transition-shadow hover:shadow-xl">
                <summary className="cursor-pointer font-semibold text-xl text-slate-700 dark:text-slate-300">
                  Test on "{test.topic}" - Score: {test.score}/{test.questions.length} 
                  <span className="ml-2 text-sm font-normal text-slate-500">({new Date(test.timestamp).toLocaleDateString()})</span>
                </summary>
                <div className="mt-6 space-y-4 border-t dark:border-slate-600 pt-4">
                  {test.questions.map(q => {
                    const userAnswer = test.userAnswers[q.id];
                    const isCorrect = userAnswer === q.correct_answer;
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-700'}`}>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{q.id}. {q.question}</h4>
                        <p className="text-sm mt-2 text-slate-700 dark:text-slate-400">Your Answer: <span className="font-medium">{userAnswer || "Not answered"}</span></p>
                        {!isCorrect && <p className="text-sm mt-1 text-green-700 dark:text-green-400">Correct Answer: <span className="font-medium">{q.correct_answer}</span></p>}
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        ) : <p className="text-center text-slate-500 dark:text-slate-400 mt-16">You have no saved tests from the last 30 days.</p>}
      </div>
    );
};