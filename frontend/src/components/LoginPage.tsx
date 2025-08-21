const LoginPage = ({ onContinue }: { onContinue: () => void; }) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-light-steel-blue dark:bg-deep-ocean p-4 transition-colors duration-300">
    <div className="w-full max-w-md bg-white dark:bg-slate-blue/50 dark:backdrop-blur-lg dark:border dark:border-steel-blue rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-4xl font-bold text-steel-blue dark:text-sky-blue">Welcome to MockTest AI</h1>
      <p className="mt-4 text-lg text-slate-blue dark:text-powder-blue">
        Generate practice tests on any topic in seconds.
      </p>
      <div className="mt-10">
        <button 
          onClick={onContinue}
          className="w-full px-6 py-3 bg-steel-blue text-white font-semibold rounded-lg hover:bg-deep-ocean disabled:opacity-50 flex items-center justify-center transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-blue"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);  

export default LoginPage;