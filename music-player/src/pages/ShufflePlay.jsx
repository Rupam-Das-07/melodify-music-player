import React, { useState, useEffect } from "react";
import SongCard from "../components/songs/SongCard";
import "./ShufflePlay.css";

const ShufflePlay = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomSongs = async () => {
    try {
      // Get a mix of popular and recent music videos
      const response = await fetch("http://localhost:3001/api/trending");
      if (!response.ok) throw new Error("Failed to fetch songs");

      const data = await response.json();
      // Shuffle the array
      const shuffledSongs = [...data].sort(() => Math.random() - 0.5);
      setSongs(shuffledSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setError("Failed to load songs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomSongs();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchRandomSongs();
  };

  if (loading) {
    return <div className="loading-state">Creating your random mix...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="shuffle-play-container">
      <div className="shuffle-play-header">
        <h1>Random Mix</h1>
        <p className="subtitle">Discover something new</p>
        <button onClick={handleRefresh} className="refresh-button">
          Shuffle Again
        </button>
      </div>

      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            title={song.title}
            artist={song.artist}
            albumArt={song.albumArt}
            videoId={song.videoId}
            views={song.views}
            likes={song.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default ShufflePlay;
