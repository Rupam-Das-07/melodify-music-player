import React, { createContext, useState, useContext, useEffect } from "react";

const RecentlyPlayedContext = createContext();

export const RecentlyPlayedProvider = ({ children }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const addToRecentlyPlayed = (song) => {
    setRecentlyPlayed((prev) => {
      // Remove the song if it already exists
      const filtered = prev.filter((item) => item.id !== song.id);
      // Add the song with current timestamp at the beginning
      const newSong = {
        ...song,
        playedAt: new Date().toISOString(),
      };
      // Keep only the last 20 songs
      return [newSong, ...filtered].slice(0, 20);
    });
  };

  return (
    <RecentlyPlayedContext.Provider
      value={{ recentlyPlayed, addToRecentlyPlayed }}
    >
      {children}
    </RecentlyPlayedContext.Provider>
  );
};

export const useRecentlyPlayed = () => useContext(RecentlyPlayedContext);
