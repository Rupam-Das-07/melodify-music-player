import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    toast.success("Playlist created");
  };

  const addToPlaylist = (playlistId, song) => {
    setPlaylists((prev) => {
      return prev.map((playlist) => {
        if (playlist.id === playlistId) {
          if (playlist.songs.some((s) => s.id === song.id)) {
            toast.error("Song already in playlist");
            return playlist;
          }
          return {
            ...playlist,
            songs: [...playlist.songs, song],
          };
        }
        return playlist;
      });
    });
  };

  const removeFromPlaylist = (playlistId, songId) => {
    setPlaylists((prev) => {
      return prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            songs: playlist.songs.filter((song) => song.id !== songId),
          };
        }
        return playlist;
      });
    });
    toast.success("Removed from playlist");
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
