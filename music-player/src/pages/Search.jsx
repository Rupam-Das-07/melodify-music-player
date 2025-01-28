import React, { useState } from 'react';
import SongCard from '../components/SongCard';
import './Search.css';

const Search = ({ onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Sample song database - replace with your actual song data
  const songDatabase = [
    {
      id: 1,
      title: "See You Again",
      artist: "Tyler, The Creator",
      coverArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "a lot",
      artist: "21 Savage",
      coverArt: "https://i.scdn.co/image/ab67616d0000b273177b3989b6aa97cc610f25c5",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    // Add more songs as needed
  ];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = songDatabase.filter(song => 
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  const handleSongClick = (song) => {
    onSongSelect(song, searchResults);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for songs or artists..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <div className="songs-grid">
            {searchResults.map(song => (
              <SongCard
                key={song.id}
                song={song}
                onSelect={() => handleSongClick(song)}
              />
            ))}
          </div>
        ) : (
          searchTerm && <p className="no-results">No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default Search;
