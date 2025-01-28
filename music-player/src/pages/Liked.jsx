import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import SongCard from "../components/songs/SongCard";
import "./Liked.css";

const Liked = ({ onSongSelect }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleSongClick = (song) => {
    // Ensure the song has all required properties
    const songToPlay = {
      ...song,
      videoId: song.videoId || song.id, // Fallback to id if videoId is not present
    };
    onSongSelect(songToPlay, favorites);
  };

  return (
    <div className="liked">
      <div className="section-header">
        <h2>Liked Songs</h2>
        <span className="song-count">{favorites.length} songs</span>
      </div>
      {favorites.length > 0 ? (
        <div className="songs-grid">
          {favorites.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={() => handleSongClick(song)}
              onFavoriteClick={() => removeFromFavorites(song.id)}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="no-songs-message">
          <p>No liked songs yet</p>
        </div>
      )}
    </div>
  );
};

export default Liked;
