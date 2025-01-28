import React, { useState } from 'react';
import { RiPlayFill, RiHeartFill, RiHeartLine, RiStarFill, RiStarLine } from 'react-icons/ri';
import { toggleLikedSong, isLikedSong, toggleFavoriteSong, isFavoriteSong } from '../utils/songStorage';
import './Library.css';

const SongCard = ({ song, onSongSelect, isPlaying }) => {
  const [isLiked, setIsLiked] = useState(isLikedSong(song.id));
  const [isStarred, setIsStarred] = useState(isFavoriteSong(song.id));

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toggleLikedSong(song);
  };

  const handleStar = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    toggleFavoriteSong(song);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    onSongSelect(song);
  };

  return (
    <div className="library-song-card">
      <div className="song-image">
        <img src={song.albumArt || song.coverArt || '/default-album-art.png'} alt={song.title} />
        <button className={`play-button ${isPlaying ? 'playing' : ''}`} onClick={handlePlay}>
          <RiPlayFill />
        </button>
      </div>
      <div className="song-info">
        <div>
          <h3 className="song-title">{song.title}</h3>
          <p className="song-artist">{song.artist}</p>
        </div>
        <div className="song-actions">
          <button
            className={`action-button ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
          >
            {isLiked ? <RiHeartFill /> : <RiHeartLine />}
          </button>
          <button
            className={`action-button ${isStarred ? 'active' : ''}`}
            onClick={handleStar}
          >
            {isStarred ? <RiStarFill /> : <RiStarLine />}
          </button>
        </div>
      </div>
    </div>
  );
};

const Library = ({ onSongSelect, currentSong }) => {
  const [activeLanguage, setActiveLanguage] = useState('hindi');

  const languages = [
    { id: 'hindi', label: 'Hindi' },
    { id: 'english', label: 'English' },
    { id: 'bengali', label: 'Bengali' }
  ];

  const songs = {
    hindi: [
      {
        id: 'h1',
        title: 'Tum Hi Ho',
        artist: 'Arijit Singh',
        albumArt: 'https://c.saavncdn.com/992/Aashiqui-2-Hindi-2013-500x500.jpg',
        language: 'hindi',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3'
      },
      {
        id: 'h2',
        title: 'Kesariya',
        artist: 'Arijit Singh',
        albumArt: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
        language: 'hindi',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Irsens_Tale/Kai_Engel_-_04_-_Moonlight_Reprise.mp3'
      },
      {
        id: 'h3',
        title: 'Raataan Lambiyan',
        artist: 'Jubin Nautiyal',
        albumArt: 'https://c.saavncdn.com/238/Shershaah-Hindi-2021-20210815181610-500x500.jpg',
        language: 'hindi',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3'
      },
      {
        id: 'h4',
        title: 'Chaleya',
        artist: 'Arijit Singh',
        albumArt: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg',
        language: 'hindi',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Drifter/Chad_Crouch_-_01_-_Drifter.mp3'
      }
    ],
    english: [
      {
        id: 'e1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
        language: 'english',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3'
      },
      {
        id: 'e2',
        title: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b273177b3989b6aa97cc610f25c5',
        language: 'english',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3'
      }
    ],
    bengali: [
      {
        id: 'b1',
        title: 'Ami Je Tomar',
        artist: 'Arijit Singh',
        albumArt: 'https://c.saavncdn.com/977/Bhool-Bhulaiyaa-2-Hindi-2022-20220517093345-500x500.jpg',
        language: 'bengali',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Irsens_Tale/Kai_Engel_-_04_-_Moonlight_Reprise.mp3'
      },
      {
        id: 'b2',
        title: 'Bojhena Se Bojhena',
        artist: 'Arijit Singh',
        albumArt: 'https://c.saavncdn.com/298/Bojhena-Shey-Bojhena-Bengali-2012-500x500.jpg',
        language: 'bengali',
        url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Drifter/Chad_Crouch_-_01_-_Drifter.mp3'
      }
    ]
  };

  const handleLanguageChange = (languageId) => {
    setActiveLanguage(languageId);
  };

  return (
    <div className="library-container">
      <div className="language-tabs">
        {languages.map((lang) => (
          <button
            key={lang.id}
            className={`language-tab ${activeLanguage === lang.id ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.id)}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="songs-grid">
        {songs[activeLanguage].map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onSongSelect={() => onSongSelect(song, songs[activeLanguage])}
            isPlaying={currentSong?.id === song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
