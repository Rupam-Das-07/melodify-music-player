import React, { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IoPlay, IoPause } from "react-icons/io5";
import { useFavorites } from "../../context/FavoritesContext";
import "./SongCard.css";

const truncateText = (text, maxLength = 25) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
};

const SongCard = ({ song, onSelect, isFavorite, onFavoriteClick, isPlaying }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
    if (onFavoriteClick) onFavoriteClick();
  };

  return (
    <div 
      className="song-card" 
      onClick={() => onSelect && onSelect(song)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img
          src={song.albumArt || song.coverArt}
          alt={song.title}
          className="song-image"
        />
        <div className={`play-overlay ${isHovered || isPlaying ? 'visible' : ''}`}>
          <button className="play-btn">
            {isPlaying ? <IoPause size={24} /> : <IoPlay size={24} />}
          </button>
        </div>
      </div>
      <div className="song-info">
        <h3 title={song.title}>{truncateText(song.title)}</h3>
        <p title={song.artist}>{truncateText(song.artist, 20)}</p>
      </div>
      <button className="favorite-btn" onClick={handleFavoriteClick}>
        {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
      </button>
    </div>
  );
};

export default SongCard;
