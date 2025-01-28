import React, { useState, useEffect } from "react";
import { fetchTop2024Songs } from "../services/musicApi";
import SongCard from "../components/songs/SongCard";
import { toast } from "react-hot-toast";
import "./Top2024.css";

const Top2024 = ({ onSongSelect }) => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const songs = await fetchTop2024Songs();
        setTopSongs(songs);
      } catch (error) {
        toast.error("Failed to load top songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="top-2024-page">
      <div className="page-header">
        <h1>Top Songs of 2024</h1>
        <p>The most played tracks of the year</p>
      </div>

      <div className="songs-grid">
        {topSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onSelect={() => onSongSelect(song, topSongs)}
          />
        ))}
      </div>
    </div>
  );
};

export default Top2024;
