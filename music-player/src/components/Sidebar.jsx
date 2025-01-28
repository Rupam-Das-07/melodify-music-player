import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { usePlaylists } from "../context/PlaylistContext";
import CreatePlaylistModal from "./CreatePlaylistModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { playlists, createPlaylist } = usePlaylists();

  const handleCreatePlaylist = (name) => {
    createPlaylist(name);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="app-logo">
          Melodify
        </NavLink>
      </div>

      <nav className="nav-links">
        <NavLink to="/" className="nav-link" end>
          <AiOutlineHome size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/library" className="nav-link">
          <BiLibrary size={20} />
          <span>Library</span>
        </NavLink>
        <NavLink to="/liked" className="nav-link">
          <AiOutlineHeart size={20} />
          <span>Liked</span>
        </NavLink>
      </nav>

      <div className="sidebar-playlists">
        <div className="playlist-header">
          <span>Playlists</span>
          <button
            className="add-playlist-btn"
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlus size={20} />
            <span>Add Playlist</span>
          </button>
        </div>
        <div className="playlist-list">
          {playlists.map((playlist) => (
            <NavLink
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="playlist-item"
            >
              {playlist.name}
            </NavLink>
          ))}
        </div>
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
