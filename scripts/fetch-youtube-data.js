#!/usr/bin/env node

/**
 * Fetch YouTube Channel and Videos Data
 * This script is run by GitHub Actions during build using secure API key from secrets
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file (for local development)
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const VIDEOS_TO_SHOW = 9;
const DATA_DIR = path.join(__dirname, '..', '_data');

// Ensure _data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function fetchYouTubeData() {
  try {
    if (!API_KEY || !CHANNEL_ID) {
      console.error('❌ Error: YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID environment variables not set');
      console.log('ℹ️  Using fallback data');
      writeFallbackData();
      return;
    }

    console.log(`🚀 Fetching YouTube data for channel: ${CHANNEL_ID}`);

    // Fetch channel data
    console.log('📺 Fetching channel information...');
    const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: CHANNEL_ID,
        key: API_KEY,
      },
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const channel = channelResponse.data.items[0];
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    // Fetch videos
    console.log('🎥 Fetching latest videos...');
    const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: VIDEOS_TO_SHOW,
        order: 'date',
        key: API_KEY,
      },
    });

    // Format the data
    const youtubeData = {
      channel: {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.high.url,
        subscriberCount: channel.statistics.subscriberCount,
        viewCount: channel.statistics.viewCount,
        videoCount: channel.statistics.videoCount,
        customUrl: channel.snippet.customUrl || '',
        lastUpdated: new Date().toISOString(),
      },
      videos: videosResponse.data.items.map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      })),
    };

    // Write data to file
    const outputFile = path.join(DATA_DIR, 'youtube.json');
    fs.writeFileSync(outputFile, JSON.stringify(youtubeData, null, 2));
    
    console.log(`✅ YouTube data saved to ${outputFile}`);
    console.log(`   - Channel: ${youtubeData.channel.title}`);
    console.log(`   - Subscribers: ${youtubeData.channel.subscriberCount}`);
    console.log(`   - Videos: ${youtubeData.videos.length}`);

  } catch (error) {
    console.error('❌ Error fetching YouTube data:', error.message);
    if (error.response?.status === 403) {
      console.error('   → YouTube API Key may be invalid or API not enabled');
    } else if (error.response?.status === 404) {
      console.error('   → Channel ID not found');
    }
    console.log('ℹ️  Using fallback data');
    writeFallbackData();
  }
}

function writeFallbackData() {
  const fallbackData = {
    channel: {
      id: process.env.YOUTUBE_CHANNEL_ID || 'UC_default',
      title: 'Azure DevOps Pro',
      description: 'DevOps is culture, tools are outcome!',
      thumbnail: 'https://via.placeholder.com/120?text=Azure+DevOps+Pro',
      subscriberCount: '0',
      viewCount: '0',
      videoCount: '0',
      customUrl: 'ashishrajsrivastava',
      lastUpdated: new Date().toISOString(),
    },
    videos: [
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Azure DevOps Tutorial - Coming Soon',
        thumbnail: 'https://via.placeholder.com/320x180?text=Video+1',
        publishedAt: new Date().toISOString(),
        description: 'Check back soon for the latest Azure DevOps tutorials!',
      },
    ],
  };

  const outputFile = path.join(DATA_DIR, 'youtube.json');
  fs.writeFileSync(outputFile, JSON.stringify(fallbackData, null, 2));
  console.log(`📝 Fallback data saved to ${outputFile}`);
}

// Run the fetch
fetchYouTubeData();
