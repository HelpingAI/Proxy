import React, { useState } from 'react';
import { Copy, CheckCircle, Activity } from 'lucide-react';
import TestResultPopup from './TestResultPopup';

interface ProxyCardProps {
  proxy: string;
  index: number;
}

const ProxyCard: React.FC<ProxyCardProps> = ({ proxy, index }) => {
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<{ status: string; message: string; response_time?: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(proxy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const testProxy = async () => {
    setTesting(true);
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
      setShowPopup(true);
    } catch (error) {
      setTestResult({ status: 'error', message: 'Failed to test proxy. Please try again.' });
      setShowPopup(true);
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Proxy 🌐</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              #{index + 1}
            </span>
            <span className="text-sm px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              {proxy.split(':')[1]}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 font-mono">{proxy}</p>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-full ${
              copied
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            } text-white transition-colors duration-300`}
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2" size={18} /> Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2" size={18} /> Copy
              </>
            )}
          </button>
          <button
            onClick={testProxy}
            disabled={testing}
            className="flex-1 flex items-center justify-center py-2 px-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white transition-colors duration-300 disabled:opacity-50"
          >
            {testing ? (
              <>
                <Activity className="mr-2 animate-spin" size={18} /> Testing...
              </>
            ) : (
              <>
                <Activity className="mr-2" size={18} /> Test
              </>
            )}
          </button>
        </div>
      </div>
      {showPopup && testResult && (
        <TestResultPopup result={testResult} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default ProxyCard;