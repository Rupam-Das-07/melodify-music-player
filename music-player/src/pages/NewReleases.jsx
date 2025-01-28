import React, { useState, useEffect } from "react";
import SongCard from "../components/songs/SongCard";
import "./NewReleases.css";

const NewReleases = ({ onSongSelect, currentSong, isPlaying }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/search?q=new music this week`
        );
        if (!response.ok) throw new Error("Failed to fetch new releases");
        const data = await response.json();
        const transformedSongs = data.map(song => ({
          id: song.videoId,
          title: song.title,
          artist: song.artist,
          albumArt: song.thumbnailUrl,
          videoId: song.videoId,
          duration: song.duration
        }));
        setSongs(transformedSongs);
      } catch (error) {
        console.error("Error fetching new releases:", error);
        setError("Failed to load new releases. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  const handleSongSelect = (song) => {
    onSongSelect(song, songs);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading new releases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="new-releases-container">
      <div className="new-releases-header">
        <h1>Latest Music Videos</h1>
        <p className="subtitle">Fresh releases from your favorite artists</p>
      </div>
      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onSelect={() => handleSongSelect(song)}
            isPlaying={currentSong?.id === song.id && isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
