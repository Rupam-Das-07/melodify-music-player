// Constants for localStorage keys
const STORAGE_KEYS = {
  RECENTLY_PLAYED: 'recentlyPlayed',
  LIKED_SONGS: 'likedSongs',
  FAVORITES: 'favorites'
};

// Maximum number of songs to store in recently played
const MAX_RECENT_SONGS = 50;

// Helper to get data from localStorage with default value
const getStorageData = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

// Helper to save data to localStorage
const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
  }
};

// Add a song to recently played
export const addToRecentlyPlayed = (song) => {
  const recentSongs = getStorageData(STORAGE_KEYS.RECENTLY_PLAYED);
  // Remove the song if it already exists
  const filteredSongs = recentSongs.filter(s => s.id !== song.id);
  // Add the song to the beginning
  const updatedSongs = [song, ...filteredSongs].slice(0, MAX_RECENT_SONGS);
  setStorageData(STORAGE_KEYS.RECENTLY_PLAYED, updatedSongs);
  return updatedSongs;
};

// Get recently played songs
export const getRecentlyPlayed = () => {
  return getStorageData(STORAGE_KEYS.RECENTLY_PLAYED);
};

// Toggle liked status of a song
export const toggleLikedSong = (song) => {
  const likedSongs = getStorageData(STORAGE_KEYS.LIKED_SONGS);
  const songIndex = likedSongs.findIndex(s => s.id === song.id);
  
  if (songIndex === -1) {
    // Add to liked songs
    likedSongs.push(song);
  } else {
    // Remove from liked songs
    likedSongs.splice(songIndex, 1);
  }
  
  setStorageData(STORAGE_KEYS.LIKED_SONGS, likedSongs);
  return likedSongs;
};

// Check if a song is liked
export const isLikedSong = (songId) => {
  const likedSongs = getStorageData(STORAGE_KEYS.LIKED_SONGS);
  return likedSongs.some(song => song.id === songId);
};

// Get all liked songs
export const getLikedSongs = () => {
  return getStorageData(STORAGE_KEYS.LIKED_SONGS);
};

// Toggle favorite status of a song
export const toggleFavoriteSong = (song) => {
  const favorites = getStorageData(STORAGE_KEYS.FAVORITES);
  const songIndex = favorites.findIndex(s => s.id === song.id);
  
  if (songIndex === -1) {
    // Add to favorites
    favorites.push(song);
  } else {
    // Remove from favorites
    favorites.splice(songIndex, 1);
  }
  
  setStorageData(STORAGE_KEYS.FAVORITES, favorites);
  return favorites;
};

// Check if a song is in favorites
export const isFavoriteSong = (songId) => {
  const favorites = getStorageData(STORAGE_KEYS.FAVORITES);
  return favorites.some(song => song.id === songId);
};

// Get all favorite songs
export const getFavoriteSongs = () => {
  return getStorageData(STORAGE_KEYS.FAVORITES);
};
