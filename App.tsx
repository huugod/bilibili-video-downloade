
import React, { useState, useCallback } from 'react';
import { VideoInfo } from './types';
import { fetchVideoInfo } from './services/geminiService';
import UrlInputForm from './components/UrlInputForm';
import VideoResult from './components/VideoResult';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { BilibiliIcon } from './components/icons/BilibiliIcon';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) {
      setError('Please enter a Bilibili video URL.');
      return;
    }

    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.hostname.includes('bilibili.com')) {
             setError('Please enter a valid Bilibili URL.');
             return;
        }
    } catch (_) {
        setError('Invalid URL format. Please enter a valid URL.');
        return;
    }


    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const data = await fetchVideoInfo(url);
      setVideoInfo(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch video information: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <BilibiliIcon className="w-16 h-16 text-pink-500" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            BiliBili Video Downloader
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Paste a Bilibili video link below to get available download options.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <UrlInputForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
        />
        
        <div className="mt-8">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {videoInfo && !loading && <VideoResult videoInfo={videoInfo} />}
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center mt-12 text-gray-500 text-sm">
        <p>This application requires a local Python server to be running.</p>
        <p>Follow the instructions in `huongdan.md` to set up the environment.</p>
      </footer>
    </div>
  );
};

export default App;
