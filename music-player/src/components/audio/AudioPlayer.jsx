import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
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
import AddToPlaylistModal from "../playlist/AddToPlaylistModal";
import { toast } from "react-hot-toast";
import "./AudioPlayer.css";

const AudioPlayer = ({ currentSong, songs, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state) => {
    setProgress(state.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFavorite = () => {
    if (!isFavorite) {
      toast.success("Added to Liked Songs");
    }
    setIsFavorite(!isFavorite);
  };

  if (!currentSong) return null;

  return (
    <div className="audio-player">
      <div className="player-left">
        <img
          src={currentSong.albumArt || currentSong.coverArt}
          alt={currentSong.title}
          className="current-song-image"
        />
        <div className="song-info">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
        <button
          className="add-to-playlist-btn"
          onClick={() => setShowPlaylistModal(true)}
        >
          <AiOutlinePlus />
        </button>
      </div>

      <div className="player-center">
        <div className="controls">
          <button onClick={onPrevious} className="control-btn">
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause} className="play-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={onNext} className="control-btn">
            <FaStepForward />
          </button>
        </div>
        <div className="progress-container">
          <ReactPlayer
            ref={playerRef}
            url={currentSong.url}
            playing={isPlaying}
            volume={isMuted ? 0 : volume}
            onProgress={handleProgress}
            onDuration={handleDuration}
            width="0"
            height="0"
          />
        </div>
      </div>

      <div className="player-right">
        <button className="volume-btn" onClick={toggleMute}>
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>

      {showPlaylistModal && (
        <AddToPlaylistModal
          onClose={() => setShowPlaylistModal(false)}
          song={currentSong}
        />
      )}
    </div>
  );
};

export default AudioPlayer;
