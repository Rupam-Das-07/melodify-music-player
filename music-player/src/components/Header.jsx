import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  RiSearchLine,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";
import { BsSun, BsMoon } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import './Header.css';

const API_BASE_URL = 'http://localhost:3001/api';

const Header = ({ isDarkTheme, onThemeToggle, onSongSelect, isAuthFlow }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Searching for:', query);
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: query }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      console.log('Search response:', response.data);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.details?.message ||
                         error.message ||
                         'Failed to search songs';
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = (song) => {
    console.log('Selected song:', song);
    if (onSongSelect) {
      onSongSelect({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumArt: song.albumArt,
        url: `https://www.youtube.com/watch?v=${song.videoId || song.id}`,
        language: 'search'
      });
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/default-album-art.png'; // Fallback image
  };

  if (isAuthFlow) return null;

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="app-logo">
          Music Player
        </Link>
      </div>
      
      <div className="header-center">
        <div className="search-container" ref={searchContainerRef}>
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((song) => (
                <div
                  key={song.id}
                  className="search-result-item"
                  onClick={() => handleSongSelect(song)}
                >
                  <img
                    src={song.albumArt || '/default-album-art.png'}
                    alt={song.title}
                    onError={handleImageError}
                  />
                  <div className="song-info">
                    <span className="song-title">{song.title}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {loading && <div className="search-message">Searching...</div>}
          {error && <div className="search-message error">{error}</div>}
        </div>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkTheme ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
