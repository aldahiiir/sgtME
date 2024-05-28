//background.js
import { IsMusicVideo } from './youtube-api-handler.js';

function getURL(callback) {
  // Query the currently active tab in the last focused window
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(tabs) {
    // Get the first tab object from the array
    var tab = tabs[0];
    // Execute the callback function with the tab URL
    callback(tab.url);
  });
}

/**
 * Checks if the given URL is valid.
 * @param {string} url - The URL to check.
 * @returns {boolean} - Returns true if the URL is valid, false otherwise.
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}


/**
 * Checks if the given URL is a valid YouTube URL.
 * @param {string} url - The URL to check.
 * @returns {boolean} - Returns true if the URL is a valid YouTube URL, false otherwise.
 */
function isYouTubeUrl(url) {
  if (!isValidUrl(url)) {
    return false;
  }
  const parsedUrl = new URL(url);
  // List of YouTube domains
  const validYouTubeDomains = ['www.youtube.com', 'youtube.com', 'youtu.be'];
  // Check if the hostname matches any of the valid YouTube domains
  return validYouTubeDomains.includes(parsedUrl.hostname);
}


// Add an event listener to the button with the ID 'saveButton'
// This is only to try the function to get the current URL of the user
document.getElementById('saveButton').addEventListener('click', () => {
  // Call the getURL function and pass a callback to handle the URL
  getURL((url) => {
    // Check if it's a valid YouTube URL first
    if (isYouTubeUrl(url)){
      // Call the IsMusicVideo function to check if it's a music video
      IsMusicVideo(url, (isMusicVideo) => {
        if (isMusicVideo) {
          alert("It is a YouTube Music Video");
        } else {
          alert("It is not a YouTube Music Video");
        }
      });
    } else {
      alert("This is not a YouTube Tab");
    }
  });
});
