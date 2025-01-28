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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            autoFocus
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
