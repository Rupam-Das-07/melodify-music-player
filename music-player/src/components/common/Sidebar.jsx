import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { FiPlus, FiMusic } from "react-icons/fi";
import { usePlaylists } from "../../context/PlaylistContext";
import CreatePlaylistModal from "../playlist/CreatePlaylistModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { playlists, createPlaylist } = usePlaylists();
  const location = useLocation();

  const handleCreatePlaylist = (name) => {
    createPlaylist(name);
    setShowModal(false);
  };

  const handleAddPlaylist = () => {
    setShowModal(true);
  };

  return (
    <div className="sidebar">
      <div className="app-logo">
        <h1>Melodify</h1>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className="nav-item" end>
          <AiOutlineHome />
          <span>Home</span>
        </NavLink>
        <NavLink to="/library" className="nav-item">
          <BiLibrary />
          <span>Your Library</span>
        </NavLink>
        <NavLink to="/liked" className="nav-item">
          <AiOutlineHeart />
          <span>Liked Songs</span>
        </NavLink>
      </nav>

      <div className="playlists-section">
        <div className="playlist-header">
          <span>PLAYLISTS</span>
        </div>
        <div className="playlist-list">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={`playlist-item ${
                location.pathname === `/playlist/${playlist.id}` ? "active" : ""
              }`}
            >
              {playlist.name}
            </NavLink>
          ))}
        </div>
        <button className="add-playlist-btn" onClick={handleAddPlaylist}>
          <FiPlus />
          <span>Add Playlist</span>
        </button>
      </div>

      <div className="other-section">
        <div className="section-header">
          <span>OTHER</span>
        </div>
        <nav className="other-menu">
          <NavLink to="/new-releases" className="nav-item">
            <FiMusic />
            <span>New Releases</span>
          </NavLink>
        </nav>
      </div>

      {showModal && (
        <CreatePlaylistModal
          onClose={() => setShowModal(false)}
          onCreatePlaylist={handleCreatePlaylist}
        />
      )}
    </div>
  );
};

export default Sidebar;
