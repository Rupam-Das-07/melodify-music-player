import React, { useState } from "react";
import "./CreatePlaylistModal.css";

const CreatePlaylistModal = ({ onClose, onCreatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim());
      onClose();
    }
  };

  return (
    <div className="create-playlist-modal-overlay" onClick={onClose}>
      <div className="create-playlist-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="create-playlist-modal-buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="create"
              disabled={!playlistName.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
