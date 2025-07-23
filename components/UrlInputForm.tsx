
import React from 'react';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  loading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.bilibili.com/video/BV..."
        className="flex-grow w-full px-5 py-4 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
        disabled={loading}
      />
      <button
        type="submit"
        className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Download'}
      </button>
    </form>
  );
};

export default UrlInputForm;
