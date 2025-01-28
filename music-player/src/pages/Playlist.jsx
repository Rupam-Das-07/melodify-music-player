import React from "react";
import { useParams } from "react-router-dom";
import { usePlaylists } from "../context/PlaylistContext";
import SongCard from "../components/songs/SongCard";
import { MdDelete } from "react-icons/md";
import "./Playlist.css";

const Playlist = ({ onSongSelect }) => {
  const { playlistId } = useParams();
  const { playlists, removeFromPlaylist } = usePlaylists();

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <div className="playlist-not-found">Playlist not found</div>;
  }

  const handleRemoveSong = (songId) => {
    removeFromPlaylist(playlist.id, songId);
  };

  return (
    <div className="playlist-page">
      <h1>{playlist.name}</h1>
      <div className="songs-grid">
        {playlist.songs.map((song) => (
          <div key={song.id} className="song-card-wrapper">
            <SongCard
              song={song}
              onSelect={() => onSongSelect(song, playlist.songs)}
            />
            <button
              className="remove-song-btn"
              onClick={() => handleRemoveSong(song.id)}
              title="Remove from playlist"
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
