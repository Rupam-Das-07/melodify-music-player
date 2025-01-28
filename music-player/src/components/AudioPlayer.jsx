import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPlaySkipBack, IoPlay, IoPause, IoPlaySkipForward } from "react-icons/io5";
import { useFavorites } from "../context/FavoritesContext";
import { useRecentlyPlayed } from "../context/RecentlyPlayedContext";
import AddToPlaylistModal from './AddToPlaylistModal';
import toast from 'react-hot-toast';
import { createPortal } from 'react-dom';
import "./AudioPlayer.css";

const AudioPlayer = ({ song, playlist, onSongSelect }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const progressInterval = useRef(null);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToRecentlyPlayed } = useRecentlyPlayed();
  const [error, setError] = useState(null);
  const [songState, setSongState] = useState(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const isFavorite = favorites.some((fav) => fav.id === songState?.id);

  useEffect(() => {
    if (song) {
      const newSongState = {
        ...song,
        videoId: song.videoId || song.id,
        thumbnailUrl: `https://img.youtube.com/vi/${song.videoId || song.id}/hqdefault.jpg`
      };
      setSongState(newSongState);
      setIsPlaying(true);
      setCurrentTime(0);
      setError(null);
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Reset progress bar
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.setProperty('--seek-before-width', '0%');
      }
    }
  }, [song]);

  useEffect(() => {
    // Set initial volume percentage
    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
      volumeSlider.style.setProperty('--volume-before-width', `${volume * 100}%`);
    }
  }, [volume]);

  const startProgressInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setCurrentTime(currentTime);
        // Update the progress bar waves
        const progressBarWaves = document.querySelector(".progress-bar-waves");
        if (progressBarWaves && duration) {
          const progress = (currentTime / duration) * 100;
          progressBarWaves.style.setProperty('--seek-before-width', `${progress}%`);
        }
      }
    }, 100); // Update more frequently for smoother progress
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (playerRef.current && duration) {
      playerRef.current.seekTo(seekTime);
      setCurrentTime(seekTime);
      // Update the progress bar waves immediately
      const progress = (seekTime / duration) * 100;
      const progressBarWaves = document.querySelector(".progress-bar-waves");
      if (progressBarWaves) {
        progressBarWaves.style.setProperty('--seek-before-width', `${progress}%`);
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume * 100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    if (playlist && playlist.length > 0) {
      const currentIndex = playlist.findIndex((s) => s.id === songState.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      const nextSong = playlist[nextIndex];
      setSongState(nextSong);
      onSongSelect(nextSong, playlist);
    }
  };

  const handlePrevious = () => {
    if (playlist && playlist.length > 0) {
      const currentIndex = playlist.findIndex((s) => s.id === songState.id);
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      const prevSong = playlist[prevIndex];
      setSongState(prevSong);
      onSongSelect(prevSong, playlist);
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(songState.id);
      toast.success("Removed from favorites");
    } else {
      if (favorites.some((s) => s.id === songState.id)) {
        toast.error("Song already in favorites");
        return;
      }
      addToFavorites(songState);
      toast.success("Added to favorites");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onStateChange = (event) => {
    // YouTube Player States: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        startProgressInterval();
        // Add to recently played when song starts playing
        if (songState) {
          addToRecentlyPlayed(songState);
        }
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        handleNext();
        break;
      default:
        break;
    }
  };

  const onError = (event) => {
    console.error("YouTube Player Error:", event);
    setError("Failed to load video. Please try again.");
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100);
      setVolume(newVolume);
      setIsMuted(false);
      e.target.style.setProperty('--volume-before-width', `${newVolume * 100}%`);
      e.target.style.setProperty('--volume-thumb-color', '#ff7f50'); 
    }
  };

  const handleAddToPlaylist = () => {
    setShowPlaylistModal(true);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  if (!songState) return null;

  return (
    <div className="audio-player">
      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <div 
          className="progress-bar-waves" 
          style={{ 
            '--seek-before-width': `${(currentTime / duration) * 100}%`
          }}
        />
        <input
          type="range"
          className="progress-bar"
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSeek}
          style={{ background: 'none' }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="main-controls">
        <div className="song-info">
          <div className="song-details">
            <div className="title-row">
              <img 
                src={songState.thumbnailUrl || songState.albumArt || 'default-album-art.png'} 
                alt={songState.title} 
                className="song-thumbnail"
              />
              <span className="song-title">{songState.title}</span>
            </div>
            <span className="song-artist">{songState.artist}</span>
          </div>
        </div>

        <div className="playback-controls">
          <button className="control-button" onClick={handlePrevious}>
            <IoPlaySkipBack size={24} />
          </button>
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? <IoPause size={24} /> : <IoPlay size={24} style={{ marginLeft: "2px" }} />}
          </button>
          <button className="control-button" onClick={handleNext}>
            <IoPlaySkipForward size={24} />
          </button>
        </div>

        <div className="player-right">
          <div className="volume-control">
            <button className="volume-button" onClick={toggleMute}>
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </div>
          <button
            className="control-button"
            onClick={handleFavoriteClick}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <MdFavorite size={20} className="favorite-icon active" /> : <MdFavoriteBorder size={20} />}
          </button>
          <button
            className="control-button"
            onClick={handleAddToPlaylist}
            title="Add to playlist"
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </div>

      <YouTube
        videoId={songState.videoId}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0
          }
        }}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        onError={onError}
      />

      {showPlaylistModal && (
        createPortal(
          <AddToPlaylistModal
            song={songState}
            onClose={() => setShowPlaylistModal(false)}
          />,
          document.body
        )
      )}
    </div>
  );
};

export default AudioPlayer;
