
import { VideoInfo } from '../types';

// The URL of the local Python backend server.
const API_BASE_URL = 'http://127.0.0.1:5000';

/**
 * Fetches real video information from the local Python backend.
 * @param url The Bilibili video URL.
 * @returns A Promise that resolves to the VideoInfo object.
 */
export const fetchVideoInfo = async (url: string): Promise<VideoInfo> => {
  // We need to encode the URL to safely pass it as a query parameter.
  const encodedUrl = encodeURIComponent(url);
  const requestUrl = `${API_BASE_URL}/api/video-info?url=${encodedUrl}`;

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      // If the server returns a non-2xx status, try to parse the error message from the backend.
      const errorData = await response.json().catch(() => ({})); // Gracefully handle cases where error response is not JSON
      const errorMessage = errorData.error || `Server responded with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data: VideoInfo = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching or parsing video info from backend:", error);
    
    let errorMessage = "An unknown error occurred.";
    if (error instanceof TypeError) {
      // This often means a network error or that the server is not running.
      errorMessage = "Could not connect to the backend server. Is it running? See huongdan.md for instructions.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Re-throw a more user-friendly error for the UI component to catch.
    throw new Error(errorMessage);
  }
};
