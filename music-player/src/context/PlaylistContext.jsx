import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [];
  });

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist.id;
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId.toString()));
  };

  const addToPlaylist = (playlistId, song) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId.toString()) {
        // Check if song already exists in playlist
        if (playlist.songs.some(s => s.id === song.id)) {
          return playlist;
        }
        return {
          ...playlist,
          songs: [...playlist.songs, song]
        };
      }
      return playlist;
    }));
  };

  const removeFromPlaylist = (playlistId, songId) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId.toString()) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
        };
      }
      return playlist;
    }));
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
