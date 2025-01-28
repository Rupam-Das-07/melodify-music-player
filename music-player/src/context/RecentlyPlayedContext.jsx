import React, { createContext, useContext, useState, useEffect } from 'react';

const RecentlyPlayedContext = createContext();

export const useRecentlyPlayed = () => {
  return useContext(RecentlyPlayedContext);
};

export const RecentlyPlayedProvider = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem('recentlyPlayed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const addToRecentlyPlayed = (song) => {
    setRecentlyPlayed(prevSongs => {
      // Remove the song if it already exists
      const filteredSongs = prevSongs.filter(s => s.id !== song.id);
      
      // Add the song to the beginning with current timestamp
      const newSong = {
        ...song,
        playedAt: new Date().toISOString()
      };
      
      // Keep only the last 10 songs
      const newRecentlyPlayed = [newSong, ...filteredSongs].slice(0, 10);
      
      return newRecentlyPlayed;
    });
  };

  const clearRecentlyPlayed = () => {
    setRecentlyPlayed([]);
    localStorage.removeItem('recentlyPlayed');
  };

  return (
    <RecentlyPlayedContext.Provider 
      value={{ 
        recentlyPlayed, 
        addToRecentlyPlayed,
        clearRecentlyPlayed 
      }}
    >
      {children}
    </RecentlyPlayedContext.Provider>
  );
};
