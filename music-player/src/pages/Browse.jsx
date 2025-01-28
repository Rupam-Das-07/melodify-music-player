import React, { useState } from "react";
import SongCard from "../components/songs/SongCard";
import { useRecentlyPlayed } from "../context/RecentlyPlayedContext";
import "./Browse.css";

const Browse = ({ onSongSelect }) => {
  const { recentlyPlayed } = useRecentlyPlayed();
  const [popularArtists] = useState([
    {
      id: 1,
      title: "See You Again",
      artist: "Tyler, The Creator",
      coverArt:
        "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "a lot",
      artist: "21 Savage",
      coverArt:
        "https://i.scdn.co/image/ab67616d0000b273177b3989b6aa97cc610f25c5",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      title: "GOOBA",
      artist: "6ix9ine",
      coverArt:
        "https://i.scdn.co/image/ab67616d0000b273a8c77c1d577d4417d5f01c4f",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "SICKO MODE",
      artist: "Travis Scott",
      coverArt:
        "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "DOUBLE TAP",
      artist: "OBLADAET",
      coverArt:
        "https://i.scdn.co/image/ab67616d0000b273b4ad7ebaf4575f120eb3f193",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ]);

  const handleSongClick = (song, songs) => {
    if (onSongSelect) {
      onSongSelect(
        {
          ...song,
          albumArt: song.coverArt || song.albumArt,
          url: song.url || `https://www.youtube.com/watch?v=${song.videoId}`,
        },
        songs
      );
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="browse">
      <section className="section">
        <div className="section-header">
          <h2>Popular Artists</h2>
          <button className="see-all">See all</button>
        </div>
        <div className="artists-grid">
          {popularArtists.map((artist) => (
            <SongCard
              key={artist.id}
              song={artist}
              onSelect={() => handleSongClick(artist, popularArtists)}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recently Played</h2>
          <span className="song-count">{recentlyPlayed.length} songs</span>
        </div>
        {recentlyPlayed.length > 0 ? (
          <div className="songs-list">
            {recentlyPlayed.map((song) => (
              <div
                key={`${song.id}-${song.playedAt}`}
                className="song-row"
                onClick={() => handleSongClick(song, recentlyPlayed)}
              >
                <img
                  src={song.coverArt || song.albumArt}
                  alt={song.title}
                  className="song-cover"
                />
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <span className="played-at">
                  {formatTimestamp(song.playedAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-songs-message">
            <p>No recently played songs</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Browse;
