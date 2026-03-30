/**
 * YouTube Integration - Loads static data from _data/youtube.json
 * Data is fetched at build time via GitHub Actions, ensuring API keys are never exposed
 * See scripts/fetch-youtube-data.js for the data fetching script
 */

// Update Channel Header with Stats
function updateChannelHeader(channelData) {
  const channelHeader = document.getElementById('youtube-header');
  
  if (!channelData || !channelHeader) return;
  
  const subscriberCount = parseInt(channelData.subscriberCount).toLocaleString();
  const viewCount = parseInt(channelData.viewCount).toLocaleString();
  
  channelHeader.innerHTML = `
    <img src="${channelData.thumbnail}" alt="Channel Avatar" class="yt-profile-pic" />
    <div class="yt-info">
      <h2>${channelData.title}</h2>
      <p>${channelData.description}</p>
      <div class="yt-stats">
        <div class="yt-stat"><strong>${subscriberCount}</strong> Subscribers</div>
        <div class="yt-stat"><strong>${viewCount}</strong> Total Views</div>
      </div>
      <a href="https://youtube.com/${channelData.customUrl || ''}" class="button button-secondary" target="_blank">
        🔔 Subscribe
      </a>
    </div>
  `;
}

// Populate Video Gallery from static YouTube data
function populateVideoGallery(videos) {
  const galleryContainer = document.getElementById('video-gallery');
  
  if (!galleryContainer || !videos || videos.length === 0) return;
  
  galleryContainer.innerHTML = '';
  
  videos.forEach(video => {
    const videoId = video.videoId;
    const thumbnail = video.thumbnail;
    const title = video.title;
    const publishedAt = new Date(video.publishedAt).toLocaleDateString();
    
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
      <a href="https://youtube.com/watch?v=${videoId}" target="_blank" style="text-decoration: none; color: inherit;">
        <img src="${thumbnail}" alt="${title}" class="video-thumbnail" />
        <div class="video-overlay">
          <div class="play-icon">▶</div>
        </div>
        <div class="video-info">
          <div class="video-title">${title}</div>
          <small style="color: #999;">${publishedAt}</small>
        </div>
      </a>
    `;
    
    galleryContainer.appendChild(videoCard);
  });
}

// Get Books Data
function getBookData() {
  return [
    {
      title: "Azure DevOps and GitHub",
      author: "Ashish Raj Srivastava",
      image: "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41hCxMl8QAL._SY462_.jpg",
      link: "https://www.amazon.de/dp/B08ZN9VTW3?ref_=cm_sw_r_kb_dp_E8B05FWWR92JNR83CX0H&tag=ashishrajsriv-21&linkCode=kpe",
      platform: "Amazon",
      description: "Master Azure DevOps and GitHub for CI/CD pipelines and enterprise workflows"
    },
    {
      title: "DevOps in Azure",
      author: "Ashish Raj Srivastava",
      image: "https://d2sofvawe08yqg.cloudfront.net/devopsinazure/s_hero?1618492615",
      link: "https://leanpub.com/devopsinazure",
      platform: "Leanpub",
      description: "Comprehensive guide to implementing DevOps practices in Microsoft Azure cloud"
    }
  ];
}

// Populate Books Section
function populateBooksSection() {
  const booksContainer = document.getElementById('books-gallery');
  if (!booksContainer) return;
  
  const books = getBookData();
  
  booksContainer.innerHTML = '';
  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'card';
    bookCard.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="card-image" />
      <div class="card-content">
        <h3 class="card-title">${book.title}</h3>
        <p class="card-subtitle">by ${book.author}</p>
        <p class="card-description">${book.description}</p>
        <a href="${book.link}" target="_blank" class="button">Get on ${book.platform}</a>
      </div>
    `;
    booksContainer.appendChild(bookCard);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load static YouTube data if available
  if (typeof window.YOUTUBE_DATA !== 'undefined' && window.YOUTUBE_DATA) {
    if (window.YOUTUBE_DATA.channel) {
      updateChannelHeader(window.YOUTUBE_DATA.channel);
    }
    if (window.YOUTUBE_DATA.videos && window.YOUTUBE_DATA.videos.length > 0) {
      populateVideoGallery(window.YOUTUBE_DATA.videos);
    }
  } else {
    console.log('📺 YouTube data will be loaded after build by GitHub Actions');
    const galleryContainer = document.getElementById('video-gallery');
    if (galleryContainer) {
      galleryContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Videos loading...</p>';
    }
  }
  
  // Load books
  if (document.getElementById('books-gallery')) {
    populateBooksSection();
  }
});
