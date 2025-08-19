const LoginPage = ({ onContinue }: { onContinue: () => void; }) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 p-4 transition-colors duration-300">
    <div className="w-full max-w-md bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border dark:border-slate-700 rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Welcome to MockTest AI</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Generate practice tests on any topic in seconds.
      </p>
      <div className="mt-10">
        <button 
          onClick={onContinue}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);  

export default LoginPage;