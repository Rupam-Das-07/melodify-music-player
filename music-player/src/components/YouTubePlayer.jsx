import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoId, onEnd }) => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube player options
  const opts = {
    height: '0',  // We'll show our custom thumbnail instead
    width: '0',   // Player will be invisible initially
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Event handlers
  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    // YouTube Player States:
    // -1 (unstarted)
    // 0 (ended)
    // 1 (playing)
    // 2 (paused)
    // 3 (buffering)
    // 5 (video cued)
    setIsPlaying(event.data === 1);
    
    if (event.data === 0 && onEnd) {
      onEnd();
    }
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="youtube-player">
      {/* Hidden YouTube component */}
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
        className="youtube-iframe"
      />

      {/* Custom player controls */}
      <div className="player-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`} 
          onClick={togglePlay}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
};

export default YouTubePlayer;
