import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFavorites } from "../context/FavoritesContext";
import "./SongCard.css";

const SongCard = ({ song, onSelect }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isLiked = isFavorite(song.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  return (
    <div className="song-card" onClick={() => onSelect(song)}>
      <div className="song-card-image">
        <img
          src={
            song.coverArt || song.albumArt || "https://via.placeholder.com/300"
          }
          alt={song.title || "No title"}
        />
        <button className="favorite-btn" onClick={handleFavoriteClick}>
          {isLiked ? (
            <AiFillHeart className="heart-icon filled" />
          ) : (
            <AiOutlineHeart className="heart-icon" />
          )}
        </button>
      </div>
      <div className="song-card-info">
        <h3 className="song-card-title">{song.title || "Unknown Title"}</h3>
        <p className="song-card-artist">{song.artist || "Unknown Artist"}</p>
      </div>
    </div>
  );
};

export default SongCard;
