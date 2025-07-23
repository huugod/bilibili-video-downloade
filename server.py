from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp
import humanize
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
# Allow CORS for all origins on all routes, which is useful for development.
# For production, you might want to restrict this to your frontend's domain.
CORS(app) 

@app.route('/api/video-info', methods=['GET'])
def get_video_info():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "URL parameter is missing"}), 400

    # Basic validation
    if 'bilibili.com' not in video_url:
        return jsonify({"error": "Invalid Bilibili URL provided"}), 400

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True,
        'force_generic_extractor': False,
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            'Referer': 'https://www.bilibili.com/',
        },
        # --- IMPORTANT FOR FIXING BLOCKS ---
        # To avoid being blocked (like with HTTP 403 or Akamai errors), you must use
        # cookies from your browser. This tells yt-dlp to use the `cookies.txt` file
        # located in the same directory as this script. Follow the steps in `huongdan.md`
        # to generate this file.
        'cookiefile': 'cookies.txt',
    }

    try:
        app.logger.info(f"Fetching info for URL: {video_url}")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            formats = []
            if info.get('formats'):
                for f in info.get('formats', []):
                    # We only want downloadable streams.
                    if not f.get('url'):
                        continue

                    file_size = f.get('filesize') or f.get('filesize_approx')
                    quality = ''
                    
                    # Process video streams (with or without audio)
                    if f.get('vcodec') != 'none' and f.get('height'):
                        quality = f"{f['height']}p"
                    
                    # Process audio-only streams
                    elif f.get('vcodec') == 'none' and f.get('acodec') != 'none':
                        bitrate = f.get('abr') # average bitrate
                        if bitrate:
                            quality = f"Audio ({int(bitrate)}kbps)"
                        else:
                            quality = "Audio Only"

                    # If we couldn't determine a quality string, skip it.
                    if not quality:
                        continue

                    formats.append({
                        'quality': quality,
                        'format': f.get('ext', 'N/A'),
                        'size': humanize.naturalsize(file_size, binary=True) if file_size else 'N/A',
                        'downloadUrl': f.get('url')
                    })
            
            # De-duplicate formats based on the generated quality string.
            seen_qualities = set()
            unique_formats = []
            for f in formats:
                if f['quality'] not in seen_qualities:
                    unique_formats.append(f)
                    seen_qualities.add(f['quality'])

            # Custom sorting: video descending by resolution, then audio descending by bitrate.
            def sort_key(f):
                quality_str = f['quality']
                if 'Audio' in quality_str:
                    # Group 1 (Audio). Sort descending by bitrate.
                    bitrate = int(''.join(filter(str.isdigit, quality_str))) if 'kbps' in quality_str else 0
                    return (1, -bitrate)
                elif 'p' in quality_str:
                    # Group 0 (Video). Sort descending by resolution.
                    resolution = int(quality_str.split('p')[0])
                    return (0, -resolution)
                # Fallback group
                return (2, 0)

            unique_formats.sort(key=sort_key)

            video_info = {
                'title': info.get('title', 'No title available'),
                'thumbnailUrl': info.get('thumbnail', ''),
                'formats': unique_formats
            }

            return jsonify(video_info)

    except yt_dlp.utils.DownloadError as e:
        app.logger.error(f"yt-dlp download error for {video_url}: {e}")
        # Provide a more user-friendly error, trying to extract the core message.
        error_message = str(e)
        if "HTTP Error 403" in error_message:
            error_message = "Access denied (403). The video may be private, region-locked, or you may need to use cookies. See huongdan.md."
        else:
            error_message = f"Failed to fetch video information. {error_message.split(':')[-1].strip()}"
        return jsonify({"error": error_message}), 500
    except Exception as e:
        app.logger.error(f"An unexpected error occurred for {video_url}: {e}")
        return jsonify({"error": "An internal server error occurred. Please check the server logs."}), 500

if __name__ == '__main__':
    # --- How to Run This Server ---
    # 1. Make sure you have Python installed.
    # 2. Install the required libraries by running this command in your terminal:
    #    pip install Flask flask_cors yt-dlp humanize
    # 3. Save this code as a Python file (e.g., server.py).
    # 4. Run the server from your terminal:
    #    python server.py
    #
    # The server will start and be accessible at http://127.0.0.1:5000
    app.run(host='0.0.0.0', port=5000, debug=True)
