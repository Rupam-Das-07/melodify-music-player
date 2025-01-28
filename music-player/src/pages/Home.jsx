import React, { useState, useEffect } from 'react';
import SongCard from '../components/songs/SongCard';
import { useFavorites } from '../context/FavoritesContext';
import './Home.css';

const Home = ({ onSongSelect }) => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/search?q=trending music this week');
        if (!response.ok) throw new Error('Failed to fetch trending songs');
        const data = await response.json();
        
        const transformedSongs = data.map(song => ({
          id: song.videoId,
          title: song.title,
          artist: song.artist,
          albumArt: song.thumbnailUrl,
          videoId: song.videoId,
          duration: song.duration
        }));
        
        setTrendingSongs(transformedSongs);
      } catch (error) {
        console.error('Error fetching trending songs:', error);
        setError('Failed to load trending songs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, []);

  const handleSongSelect = (song) => {
    onSongSelect(song, trendingSongs);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading trending songs...</p>
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
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Music Player</h1>
        <p className="subtitle">Discover the latest and trending music</p>
      </div>

      <section className="trending-section">
        <h2>Trending Now</h2>
        <div className="songs-grid">
          {trendingSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={() => handleSongSelect(song)}
              isFavorite={favorites.some(fav => fav.id === song.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
