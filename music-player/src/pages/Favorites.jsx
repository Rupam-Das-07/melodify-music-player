import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import SongCard from "../components/SongCard";
import "./Favorites.css";

const Favorites = ({ onSongSelect }) => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleSongClick = (song) => {
    onSongSelect(song, favorites);
  };

  return (
    <div className="favorites">
      <div className="section-header">
        <h2>Favorite Songs</h2>
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
          <p>No favorite songs yet</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
