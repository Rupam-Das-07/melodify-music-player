import React, { useState, useEffect } from "react";
import SongCard from "../components/songs/SongCard";
import axios from "axios";
import "./Library.css";

const Library = ({ onSongSelect }) => {
  const [hindiSongs, setHindiSongs] = useState([]);
  const [englishSongs, setEnglishSongs] = useState([]);
  const [bengaliSongs, setBengaliSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultSongs = {
    hindi: [
      {
        id: 1,
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273c5d3c6535f4da9c0fb3d8726",
        videoId: "IJq0yyWug1k",
      },
      {
        id: 2,
        title: "Kesariya",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273c08202c50371e234d20caf62",
        videoId: "BddP6PYo2gs",
      },
      {
        id: 3,
        title: "Chaleya",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273d8a5bfa91377ff2874342e3d",
        videoId: "VAdGW7QDJiU",
      },
      {
        id: 4,
        title: "Raataan Lambiyan",
        artist: "Jubin Nautiyal",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273771b4ee4da6b9ab6f3b33a7d",
        videoId: "gvyUuxdRdR4",
      },
      {
        id: 5,
        title: "What Jhumka",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273875d34d1867bea07d9d2b6c9",
        videoId: "87JIOAX3njM",
      },
      {
        id: 6,
        title: "Tere Pyaar Mein",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
        videoId: "WzHyaKEgZWA",
      },
      {
        id: 7,
        title: "O Bedardeya",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
        videoId: "jHNNMj5bNQw",
      },
      {
        id: 8,
        title: "Phir Aur Kya Chahiye",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
        videoId: "pjTj-_55WZ8",
      },
    ],
    english: [
      {
        id: 9,
        title: "Blinding Lights",
        artist: "The Weeknd",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        videoId: "4NRXx6U8ABQ",
      },
      {
        id: 10,
        title: "Shape of You",
        artist: "Ed Sheeran",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        videoId: "JGwWNGJdvx8",
      },
      {
        id: 11,
        title: "Stay With Me",
        artist: "Sam Smith",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273b11bdc91cb9ac6b14f5c1dae",
        videoId: "pB-5XG-DbAA",
      },
      {
        id: 12,
        title: "Perfect",
        artist: "Ed Sheeran",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        videoId: "2Vv-BfVoq4g",
      },
      {
        id: 13,
        title: "Starboy",
        artist: "The Weeknd",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
        videoId: "34Na4j8AVgA",
      },
      {
        id: 14,
        title: "Someone Like You",
        artist: "Adele",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300",
        videoId: "hLQl3WQQoQ0",
      },
      {
        id: 15,
        title: "All of Me",
        artist: "John Legend",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273233156237e4b130b4dbaf8e4",
        videoId: "450p7goxZqg",
      },
    ],
    bengali: [
      {
        id: 16,
        title: "Ami Je Tomar",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec7c3dc11ad6",
        videoId: "UX0fKTyQ2V0",
      },
      {
        id: 17,
        title: "Dhaka Trip",
        artist: "Pritom Hasan",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273f461bbc21a9bcec43b1e23d5",
        videoId: "2mDCVzruYzQ",
      },
      {
        id: 18,
        title: "Poran",
        artist: "Madhubanti Bagchi",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273f461bbc21a9bcec43b1e23d5",
        videoId: "Yw5yDgWyr_I",
      },
      {
        id: 19,
        title: "Shayarane",
        artist: "Anupam Roy",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273d8a5bfa91377ff2874342e3d",
        videoId: "N6m-2-Vz4vc",
      },
      {
        id: 20,
        title: "Bojhena Se Bojhena",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec7c3dc11ad6",
        videoId: "HymeW8jXTdQ",
      },
      {
        id: 21,
        title: "Tomake Chuye Dilam",
        artist: "Arijit Singh",
        coverArt:
          "https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec7c3dc11ad6",
        videoId: "WSrFcnkj9co",
      },
    ],
  };

  // Function to fetch more songs from YouTube API
  const fetchMoreSongs = async (category) => {
    const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your API key
    const searchQueries = {
      hindi: "new hindi songs 2024",
      english: "new english songs 2024",
      bengali: "new bengali songs 2024",
    };

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQueries[category]}&type=video&key=${YOUTUBE_API_KEY}`
      );

      const newSongs = response.data.items.map((item, index) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        coverArt: item.snippet.thumbnails.high.url,
        videoId: item.id.videoId,
      }));

      // Update the appropriate category
      switch (category) {
        case "hindi":
          setHindiSongs((prev) => [...prev, ...newSongs]);
          break;
        case "english":
          setEnglishSongs((prev) => [...prev, ...newSongs]);
          break;
        case "bengali":
          setBengaliSongs((prev) => [...prev, ...newSongs]);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`Error fetching ${category} songs:`, err);
    }
  };

  useEffect(() => {
    const initializeSongs = async () => {
      try {
        setLoading(true);
        // Set initial songs
        setHindiSongs(
          defaultSongs.hindi.map((song) => ({
            ...song,
            url: `https://www.youtube.com/watch?v=${song.videoId}`,
          }))
        );
        setEnglishSongs(
          defaultSongs.english.map((song) => ({
            ...song,
            url: `https://www.youtube.com/watch?v=${song.videoId}`,
          }))
        );
        setBengaliSongs(
          defaultSongs.bengali.map((song) => ({
            ...song,
            url: `https://www.youtube.com/watch?v=${song.videoId}`,
          }))
        );

        // Fetch more songs for each category
        await Promise.all([
          fetchMoreSongs("hindi"),
          fetchMoreSongs("english"),
          fetchMoreSongs("bengali"),
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Error setting up songs:", err);
        setError("Failed to load songs. Please try again later.");
        setLoading(false);
      }
    };

    initializeSongs();
  }, []);

  const handleSongClick = (song, songs) => {
    if (onSongSelect) {
      onSongSelect(
        {
          ...song,
          albumArt: song.coverArt,
          url: song.url,
        },
        songs
      );
    }
  };

  if (loading) {
    return (
      <div className="library loading">
        <div className="loading-spinner"></div>
        <p>Loading songs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="library error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="library">
      <section className="section">
        <div className="section-header">
          <h2>Hindi Songs</h2>
          <span className="song-count">{hindiSongs.length} songs</span>
        </div>
        <div className="songs-grid">
          {hindiSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={() => handleSongClick(song, hindiSongs)}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>English Songs</h2>
          <span className="song-count">{englishSongs.length} songs</span>
        </div>
        <div className="songs-grid">
          {englishSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={() => handleSongClick(song, englishSongs)}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Bengali Songs</h2>
          <span className="song-count">{bengaliSongs.length} songs</span>
        </div>
        <div className="songs-grid">
          {bengaliSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={() => handleSongClick(song, bengaliSongs)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;
