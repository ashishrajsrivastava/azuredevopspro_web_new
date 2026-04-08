/**
 * Azure DevOps Pro — Main JS
 * - Dark / Light theme toggle (persisted to localStorage)
 * - YouTube channel + video gallery (from preloaded window.YOUTUBE_DATA)
 * - Books section
 * - Mobile navigation
 */

/* ============================================================
   THEME
   ============================================================ */
(function () {
  const STORAGE_KEY = 'adp-theme';
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  function getSavedTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }

  // Apply immediately to avoid flash
  const saved = getSavedTheme();
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || preferred);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Sync icon on load
    applyTheme(html.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
  });
})();

/* ============================================================
   MOBILE NAV
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.className = mobileNav.classList.contains('open')
          ? 'fa-solid fa-xmark'
          : 'fa-solid fa-bars';
      }
    });
  }
});

/* ============================================================
   HEADER SCROLL SHADOW
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (!header) return;
  const observer = new IntersectionObserver(
    ([e]) => header.classList.toggle('scrolled', !e.isIntersecting),
    { rootMargin: '-1px 0px 0px 0px', threshold: [1] }
  );
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
});

/* ============================================================
   YOUTUBE — Channel Strip
   ============================================================ */
function renderChannelStrip(channel) {
  const strip = document.getElementById('yt-channel-strip');
  if (!strip || !channel) return;

  const subs = parseInt(channel.subscriberCount || 0).toLocaleString();
  const views = parseInt(channel.viewCount || 0).toLocaleString();
  const videos = channel.videoCount || '—';

  strip.innerHTML = `
    <img src="${channel.thumbnail}" alt="${channel.title}" class="yt-avatar" loading="lazy" />
    <div class="yt-channel-info">
      <h3>${channel.title}</h3>
      <p>${channel.description.slice(0, 110).trim()}…</p>
      <div class="yt-channel-stats">
        <span class="yt-stat-item"><strong>${subs}</strong> subscribers</span>
        <span class="yt-stat-item"><strong>${views}</strong> views</span>
        <span class="yt-stat-item"><strong>${videos}</strong> videos</span>
      </div>
    </div>
    <a href="https://youtube.com/${channel.customUrl || '@azuredevopspro'}" class="btn btn-outline" target="_blank" rel="noopener" style="flex-shrink:0;">
      <i class="fa-brands fa-youtube" style="color:var(--yt-red)"></i> Channel
    </a>
  `;
}

/* ============================================================
   YOUTUBE — Video Gallery
   ============================================================ */
function renderVideoGallery(videos) {
  const gallery = document.getElementById('video-gallery');
  if (!gallery || !videos || videos.length === 0) return;

  // Show max 6 latest
  const toShow = videos.slice(0, 6);

  gallery.innerHTML = toShow.map(v => {
    const date = new Date(v.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
    return `
      <a href="https://youtube.com/watch?v=${v.videoId}" target="_blank" rel="noopener" class="video-card">
        <div class="video-thumb-wrap">
          <img src="${v.thumbnail}" alt="${escHtml(v.title)}" class="video-thumb" loading="lazy" />
          <div class="video-play-overlay">
            <div class="play-btn-circle"><i class="fa-solid fa-play"></i></div>
          </div>
        </div>
        <div class="video-meta">
          <div class="video-title">${escHtml(v.title)}</div>
          <div class="video-date">${date}</div>
        </div>
      </a>
    `;
  }).join('');
}

/* ============================================================
   BOOKS
   ============================================================ */
const BOOKS = [
  {
    title: 'Azure DevOps and GitHub',
    author: 'Ashish Raj Srivastava',
    image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/41hCxMl8QAL._SY462_.jpg',
    link: 'https://www.amazon.de/dp/B08ZN9VTW3?ref_=cm_sw_r_kb_dp_E8B05FWWR92JNR83CX0H&tag=ashishrajsriv-21&linkCode=kpe',
    platform: 'Amazon',
    badge: 'badge-orange',
    description: 'Master Azure DevOps and GitHub for enterprise CI/CD pipelines, branching strategies, and collaborative workflows.'
  },
  {
    title: 'DevOps in Azure',
    author: 'Ashish Raj Srivastava',
    image: 'https://d2sofvawe08yqg.cloudfront.net/devopsinazure/s_hero?1618492615',
    link: 'https://leanpub.com/devopsinazure',
    platform: 'Leanpub',
    badge: 'badge-blue',
    description: 'Comprehensive guide to implementing DevOps practices in Microsoft Azure cloud — from IaC to observability.'
  }
];

function renderBooks() {
  const container = document.getElementById('books-gallery');
  if (!container) return;

  container.innerHTML = BOOKS.map(book => `
    <div class="book-card">
      <div class="book-cover">
        <img src="${book.image}" alt="${escHtml(book.title)}" loading="lazy" />
      </div>
      <div class="book-details">
        <span class="book-platform">${book.platform}</span>
        <h3 class="book-title">${escHtml(book.title)}</h3>
        <p class="book-author">by ${escHtml(book.author)}</p>
        <p class="book-desc">${escHtml(book.description)}</p>
        <a href="${book.link}" target="_blank" rel="noopener" class="btn btn-orange" style="margin-top:0.5rem;align-self:flex-start;">
          <i class="fa-solid fa-book-open"></i> Get the Book
        </a>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   TELEGRAM CHAT SIMULATION
   ============================================================ */
const TELEGRAM_THREADS = [
  [
    { sender: 'Priya K.', type: 'theirs', text: 'Just deployed to AKS using Azure DevOps pipeline 🚀 took 4 mins end to end!', time: '17:02' },
    { sender: 'Rahul M.', type: 'theirs', text: 'Nice! Are you using Helm or Kustomize for manifests?', time: '17:03' },
    { type: 'mine', text: 'Helm with value overrides per env. Works great with Azure DevOps variable groups 💡', time: '17:04' },
    { sender: 'Ashish Raj', type: 'theirs', text: 'Check out the Bicep module approach I shared last week — cleaner IaC for AKS too 📚', time: '17:05' },
    { sender: 'Jonas W.', type: 'theirs', text: 'This community is gold 🙌 learning something new every day', time: '17:06' }
  ],
  [
    { sender: 'David L.', type: 'theirs', text: 'Anyone faced an issue with terraform state lock in Azure Storage?', time: '09:15' },
    { sender: 'Sarah C.', type: 'theirs', text: 'Yes, if a pipeline crashed. You can break the lease via Azure Portal.', time: '09:17' },
    { type: 'mine', text: 'Ensure you have retry logic on your state backend config too! And always use the break lease option cautiously.', time: '09:20' },
    { sender: 'David L.', type: 'theirs', text: 'Thanks! Breaking the lease worked. Much appreciated 🙏', time: '09:25' }
  ],
  [
    { sender: 'Elena G.', type: 'theirs', text: 'Best practices for securing secrets in CI/CD?', time: '14:30' },
    { type: 'mine', text: 'Azure Key Vault integration with Azure Pipelines library is the standard way to go.', time: '14:32' },
    { sender: 'Mike T.', type: 'theirs', text: 'Also check out Workload Identity Federation so you don\'t need client secrets.', time: '14:35' },
    { sender: 'Elena G.', type: 'theirs', text: 'Oh nice, no more expiring SPN passwords! Will look into WIF.', time: '14:40' }
  ],
  [
    { sender: 'Chris', type: 'theirs', text: 'What is everyone using for GenAI ops? LangChain or Semantic Kernel?', time: '11:05' },
    { type: 'mine', text: 'We are mostly standardizing on Semantic Kernel right now for better .NET integration.', time: '11:10' },
    { sender: 'Anna', type: 'theirs', text: 'Same here, the new MS documentation for Semantic Kernel is solid.', time: '11:15' }
  ]
];

function renderTelegramChat() {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  // Pick a random thread
  const thread = TELEGRAM_THREADS[Math.floor(Math.random() * TELEGRAM_THREADS.length)];

  container.innerHTML = thread.map((msg, idx) => {
    const delay = (0.1 + (idx * 0.2)).toFixed(1);
    const senderHtml = msg.sender ? `<span class="bubble-sender">${escHtml(msg.sender)}</span>` : '';
    return `
      <div class="chat-bubble ${msg.type}" style="animation-delay:${delay}s">
        ${senderHtml}
        <div class="bubble-text">${escHtml(msg.text)}</div>
        <span class="bubble-time">${msg.time}</span>
      </div>
    `;
  }).join('');
}

/* ============================================================
   UTILS
   ============================================================ */
function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // YouTube
  if (window.YOUTUBE_DATA) {
    if (window.YOUTUBE_DATA.channel) {
      renderChannelStrip(window.YOUTUBE_DATA.channel);
    }
    if (window.YOUTUBE_DATA.videos && window.YOUTUBE_DATA.videos.length > 0) {
      renderVideoGallery(window.YOUTUBE_DATA.videos);
    }
  } else {
    const gallery = document.getElementById('video-gallery');
    if (gallery) {
      gallery.innerHTML = '<p style="color:var(--text-muted);font-family:var(--font-mono);font-size:0.85rem;">// Videos loading after build…</p>';
    }
  }

  // Books
  renderBooks();

  // Telegram Chat Simulation
  renderTelegramChat();
});
