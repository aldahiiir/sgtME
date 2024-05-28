// youtube-api-handler.js

const fs = require('fs');

// Read the config file
const rawConfig = fs.readFileSync('config.json');
const config = JSON.parse(rawConfig);

const API_KEY = config.YouTube_API_Key;

function IsMusicVideo(url, callback) {
  // Extract the video ID from the URL
  const videoId = extractVideoId(url);
  
  if (!videoId) {
    callback(false);
    return;
  }

  // Define the API endpoint to get video details
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

  // Fetch the video details from YouTube Data API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const videoCategory = data.items[0].snippet.categoryId;
        // Category ID 10 corresponds to Music
        if (videoCategory === "10") {
          callback(true);
        } else {
          callback(false);
        }
      } else {
        callback(false);
      }
    })
    .catch(error => {
      console.error('Error fetching video details:', error);
      callback(false);
    });
}

function extractVideoId(url) {
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  return videoIdMatch ? videoIdMatch[1] : null;
}

// Export the IsMusicVideo function for use in other modules
export { IsMusicVideo };