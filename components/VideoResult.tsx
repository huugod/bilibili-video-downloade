
import React from 'react';
import { VideoInfo, VideoFormat } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface VideoResultProps {
  videoInfo: VideoInfo;
}

const FormatItem: React.FC<{ format: VideoFormat }> = ({ format }) => (
  <li className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg transition-colors hover:bg-gray-700/50">
    <div className="flex items-center gap-4">
      <span className="font-semibold text-pink-400 bg-pink-900/50 px-3 py-1 rounded-md text-sm">{format.quality}</span>
      <span className="text-gray-300">{format.format}</span>
      <span className="text-gray-400 text-sm hidden sm:inline">{format.size}</span>
    </div>
    <a
      href={format.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-transform transform hover:scale-105"
    >
      <DownloadIcon className="w-4 h-4" />
      Download
    </a>
  </li>
);

const VideoResult: React.FC<VideoResultProps> = ({ videoInfo }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl shadow-black/30 overflow-hidden animate-fade-in">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">{videoInfo.title}</h2>
        <div className="aspect-video w-full mb-6">
          <img
            src={videoInfo.thumbnailUrl}
            alt={videoInfo.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-200">Available Formats</h3>
        <ul className="space-y-3">
          {videoInfo.formats.map((format, index) => (
            <FormatItem key={index} format={format} />
          ))}
        </ul>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VideoResult;
