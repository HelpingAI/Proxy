import React, { useState } from 'react';
import { CheckCircle, XCircle, Activity } from 'lucide-react';

const ProxyTester: React.FC = () => {
  const [proxy, setProxy] = useState('');
  const [testResult, setTestResult] = useState<{ status: string; message: string; response_time?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const testProxy = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const response = await fetch('https://abhaykoul-backend.hf.space/test-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proxy }),
      });
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({ status: 'error', message: 'Failed to test proxy. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Proxy Tester 🧪</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <input
          type="text"
          value={proxy}
          onChange={(e) => setProxy(e.target.value)}
          placeholder="Enter proxy (e.g., 67.43.227.228:28209)"
          className="flex-grow px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
        />
        <button
          onClick={testProxy}
          disabled={loading}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <>
              <Activity className="mr-2 animate-spin" size={20} /> Testing...
            </>
          ) : (
            <>
              <Activity className="mr-2" size={20} /> Test Proxy
            </>
          )}
        </button>
      </div>
      {testResult && (
        <div className={`mt-6 p-4 rounded-lg ${testResult.status === 'success' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
          <div className="flex items-center">
            {testResult.status === 'success' ? (
              <CheckCircle className="text-green-500 mr-3" size={24} />
            ) : (
              <XCircle className="text-red-500 mr-3" size={24} />
            )}
            <p className={`font-semibold ${testResult.status === 'success' ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
              {testResult.message}
            </p>
          </div>
          {testResult.response_time && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Response time: {testResult.response_time}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProxyTester;