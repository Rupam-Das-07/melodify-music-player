import React from "react";
import { useRecentlyPlayed } from "../context/RecentlyPlayedContext";
import "./RecentlyPlayed.css";

const RecentlyPlayed = ({ onSongSelect }) => {
  const { recentlyPlayed } = useRecentlyPlayed();

  const handleSongClick = (song) => {
    // Ensure the song has all required properties
    const songToPlay = {
      ...song,
      videoId: song.videoId || song.id, // Fallback to id if videoId is not present
    };
    onSongSelect(songToPlay, recentlyPlayed);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than a minute
    if (diff < 60000) {
      return "Just now";
    }
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    // More than a day
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  // Fallback image URL
  const getFallbackImage = (song) => {
    // Check for multiple possible image sources
    const imageSources = [
      song.coverArt, 
      song.albumArt, 
      song.thumbnail, 
      song.image,
      `https://img.youtube.com/vi/${song.videoId}/default.jpg`
    ];

    // Return the first valid image URL, or a default placeholder
    return imageSources.find(src => src) || 'https://via.placeholder.com/150?text=Song';
  };

  return (
    <div className="recently-played">
      <h2>Recently Played</h2>
      <div className="recently-played-list">
        {recentlyPlayed.map((song) => (
          <div
            key={`${song.id}-${song.playedAt}`}
            className="recently-played-item"
            onClick={() => handleSongClick(song)}
          >
            <img 
              src={getFallbackImage(song)} 
              alt={song.title || 'Recent Song'} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/150?text=Song' 
              }}
            />
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <span className="played-at">
                {formatTimestamp(song.playedAt)}
              </span>
            </div>
          </div>
        ))}
        {recentlyPlayed.length === 0 && (
          <p className="no-songs">No recently played songs</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
