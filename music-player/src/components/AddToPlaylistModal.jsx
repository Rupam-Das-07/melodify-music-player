import React from "react";
import { usePlaylists } from "../context/PlaylistContext";
import { toast } from "react-hot-toast";
import "./AddToPlaylistModal.css";

const AddToPlaylistModal = ({ onClose, song }) => {
  const { playlists, addToPlaylist } = usePlaylists();

  const handleAddToPlaylist = (playlistId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist.songs.some((s) => s.id === song.id)) {
      toast.error("Song already in playlist");
      return;
    }
    addToPlaylist(playlistId, song);
    toast.success(`Added to ${playlist.name} playlist`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add to Playlist</h2>
        <div className="playlists-list">
          {playlists.length === 0 ? (
            <p className="no-playlists">No playlists created yet</p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="playlist-option"
                onClick={() => handleAddToPlaylist(playlist.id)}
              >
                {playlist.name}
              </button>
            ))
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
