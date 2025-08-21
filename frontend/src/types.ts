// --- Type Definitions ---

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export interface SavedTest {
  topic: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  score: number;
  timestamp: number;
  exam: string;
  language: string;
}

export type QuizStatus = 'idle' | 'generating' | 'taking' | 'submitted' | 'reviewing';
export type AppView = 'login' | 'main' | 'history';