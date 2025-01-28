import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import "./Header.css";

const Header = ({ darkMode, toggleDarkMode, toggleSidebar, onSongSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for search
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 500); // Debounce search for 500ms
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search songs. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = (song) => {
    if (onSongSelect) {
      onSongSelect(song);
      toast.success("Now playing: " + song.title);
    }
    setShowResults(false);
    setSearchQuery("");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <header className="header">
      <button className="menu-toggle mobile-only" onClick={toggleSidebar}>
        <FiMenu />
      </button>
      
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
              }}
            >
              <FiX />
            </button>
          )}
        </div>

        {showResults && (
          <div className="search-results">
            {loading ? (
              <div className="search-loading">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((song) => (
                <div
                  key={song.id}
                  className="search-result-item"
                  onClick={() => handleSongSelect(song)}
                >
                  <img
                    src={song.albumArt || song.thumbnailUrl}
                    alt={song.title}
                    className="result-image"
                  />
                  <div className="result-info">
                    <div className="result-title">{song.title}</div>
                    <div className="result-artist">{song.artist}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No songs found</div>
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <div className="auth-buttons">
          <button onClick={handleLogin} className="auth-button login">
            Log in
          </button>
          <button onClick={handleSignup} className="auth-button signup">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
