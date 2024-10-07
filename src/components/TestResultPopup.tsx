import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface TestResultPopupProps {
  result: {
    status: string;
    message: string;
    response_time?: string;
  };
  onClose: () => void;
}

const TestResultPopup: React.FC<TestResultPopupProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full m-4 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Test Result</h3>
        <div className={`p-4 rounded-lg ${result.status === 'success' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'}`}>
          <div className="flex items-center mb-2">
            {result.status === 'success' ? (
              <CheckCircle className="text-green-500 mr-3" size={24} />
            ) : (
              <XCircle className="text-red-500 mr-3" size={24} />
            )}
            <p className={`font-semibold ${result.status === 'success' ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
              {result.message}
            </p>
          </div>
          {result.response_time && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Response time: {result.response_time}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultPopup;