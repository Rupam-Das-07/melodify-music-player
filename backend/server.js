const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Search endpoint that combines YouTube search results
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const youtubeResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: q,
          type: 'video',
          videoCategoryId: '10', // Music category
          key: YOUTUBE_API_KEY
        }
      }
    );

    const songs = youtubeResponse.data.items.map(item => {
      const videoId = item.id.videoId;
      return {
        id: videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        albumArt: item.snippet.thumbnails.high.url,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        duration: 0, // YouTube API v3 doesn't provide duration in search results
        source: 'youtube',
        videoId: videoId // Add videoId directly for easier access
      };
    });

    res.json(songs);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search songs' });
  }
});

// Get trending music videos
app.get('/api/trending', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          videoCategoryId: '10', // Music category
          maxResults: 20,
          key: YOUTUBE_API_KEY
        }
      }
    );

    const videos = response.data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      albumArt: item.snippet.thumbnails.high.url,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      videoId: item.id, // Add videoId directly
      views: item.statistics.viewCount,
      source: 'youtube'
    }));

    res.json(videos);
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    res.status(500).json({ error: 'Failed to fetch trending videos' });
  }
});

// Get video details
app.get('/api/video/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id,
        key: YOUTUBE_API_KEY
      }
    });

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const video = response.data.items[0];
    res.json({
      id: video.id,
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      albumArt: video.snippet.thumbnails.high.url,
      videoId: video.id,
      views: video.statistics.viewCount,
      likes: video.statistics.likeCount,
      duration: video.contentDetails.duration,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt
    });
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch video details' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
