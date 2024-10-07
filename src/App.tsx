import React, { useState, useEffect } from 'react';
import { RefreshCw, Moon, Sun, Shield } from 'lucide-react';
import ProxyManager from './ProxyManager';
import ProxyCard from './components/ProxyCard';

const App: React.FC = () => {
  const [proxies, setProxies] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('dark', savedDarkMode);
    fetchProxies();
    const interval = setInterval(fetchProxies, 60000); // Auto-refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchProxies = async () => {
    const newProxies = await ProxyManager.refreshProxies();
    setProxies(newProxies);
    setLastUpdated(new Date().toLocaleString());
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-green-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 animate-pulse flex items-center justify-center">
            <Shield className="mr-4" size={48} />
            ProxyHive
          </h1>
          <p className="text-2xl mb-8 text-gray-600 dark:text-gray-300">Secure and Fast Proxies by HelpingAI</p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={fetchProxies}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 flex items-center"
            >
              <RefreshCw className="mr-2" size={24} /> Refresh Proxies
            </button>
            <button
              onClick={toggleDarkMode}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold p-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            >
              {darkMode ? <Sun size={28} /> : <Moon size={28} />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {proxies.map((proxy, index) => (
            <ProxyCard key={index} proxy={proxy} index={index} />
          ))}
        </div>

        <footer className="text-center mt-16">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">© 2024 HelpingAI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;