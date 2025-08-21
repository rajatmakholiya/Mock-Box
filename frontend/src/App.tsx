import { useState, useEffect } from "react";
import { MainPage } from './components/MainPage';
import { PreviousTestsPage } from './components/PreviousTestsPage';
import type { AppView } from "./types";
import LoginPage from "./components/LoginPage";

// --- App Root ---
export default function App() {
  const [view, setView] = useState<AppView>('login');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const handleContinue = () => { setView('main'); };

  const PageToRender = () => {
    switch(view) {
      case 'history': return <PreviousTestsPage onBack={() => setView('main')} />;
      case 'main': return <MainPage onShowHistory={() => setView('history')} />;
      case 'login': default: return <LoginPage onContinue={handleContinue} />;
    }
  }

  return (
    <div className="min-h-screen bg-light-steel-blue dark:bg-deep-ocean text-slate-blue dark:text-powder-blue transition-colors duration-300">
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
        className="fixed bottom-4 right-4 z-20 p-3 rounded-full bg-white/70 dark:bg-slate-blue/60 dark:backdrop-blur-lg dark:border dark:border-steel-blue shadow-lg text-2xl transition-transform hover:scale-110"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <PageToRender />
    </div>
  );
}