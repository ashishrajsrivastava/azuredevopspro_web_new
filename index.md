---
layout: default
title: Home
description: "Ashish Raj Srivastava — Cloud & GenAI Platform Architect, Microsoft Certified Expert, Author, and Community Builder. Specializing in CAF, WAF, Landing Zones, and Safe Scale AI."
---

<script>
  window.YOUTUBE_DATA = {{ site.data.youtube | jsonify }};
</script>

<!-- =========================================================
     HERO
     ========================================================= -->
<section class="hero-section">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <p class="hero-prompt">intro --about-me</p>

        <h1 class="hero-name">
          Hi, I'm <span class="highlight">Ashish Raj</span>
        </h1>
        <p class="hero-title">// Cloud &amp; GenAI Platform Architect · Author · Community Builder</p>

        <p class="hero-bio">
          Technologist and storyteller helping engineering teams architect scalable platforms.
          Expert in <b> Microsoft Cloud Adoption Framework (CAF)</b>, <b> Well-Architected Framework (WAF) </b>, and <b> Azure Landing Zones </b>. 
          Currently focused on <b> GenAI Infrastructure </b>> and <b> Safe Scale AI Landing Zones</b> .
        </p>

        <div class="hero-badges">
          <span class="badge badge-blue">Cloud Architecture</span>
          <span class="badge badge-blue">GenAI Platform</span>
          <span class="badge badge-green">CAF &amp; WAF</span>
          <span class="badge badge-green">Landing Zones</span>
          <span class="badge badge-orange">Safe Scale AI</span>
          <span class="badge badge-orange">Platform Engineering</span>
        </div>

        <div class="hero-actions">
          <a href="https://t.me/azuredevopspro" class="btn btn-primary" target="_blank" rel="noopener">
            <i class="fa-brands fa-telegram"></i> Join Community
          </a>
          <a href="http://resume.azuredevopspro.com/" class="btn btn-outline" target="_blank" rel="noopener">
            <i class="fa-solid fa-file-lines"></i> View Resume
          </a>
        </div>
      </div>

      <!-- Terminal Card -->
      <div class="terminal-card">
        <div class="terminal-bar">
          <div class="terminal-dots">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
          </div>
          <span class="terminal-title">ashish@devops ~ bash</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="term-prompt">❯</span>
            <span class="term-cmd">whoami</span>
          </div>
          <div class="terminal-line">
            <span class="term-out info">ashish-raj-srivastava</span>
          </div>
          <div class="terminal-line" style="margin-top:0.4rem">
            <span class="term-prompt">❯</span>
            <span class="term-cmd">cat skills.txt</span>
          </div>
          <div class="terminal-line"><span class="term-out">→ Cloud Adoption &amp; WAF Governance</span></div>
          <div class="terminal-line"><span class="term-out">→ GenAI Infrastructure &amp; AI Landing Zones</span></div>
          <div class="terminal-line"><span class="term-out">→ Enterprise Azure Landing Zones</span></div>
          <div class="terminal-line"><span class="term-out">→ Cloud-Native Platform Engineering</span></div>
          <div class="terminal-line" style="margin-top:0.4rem">
            <span class="term-prompt">❯</span>
            <span class="term-cmd">certifications --list</span>
          </div>
          <div class="terminal-line"><span class="term-out success">✔ MS DevOps Expert</span></div>
          <div class="terminal-line"><span class="term-out success">✔ Microsoft Certified Trainer</span></div>
          <div class="terminal-line" style="margin-top:0.4rem">
            <span class="term-prompt">❯</span>
            <span class="term-out"><span class="term-cursor"></span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     TELEGRAM COMMUNITY
     ========================================================= -->
<section class="telegram-section">
  <div class="container">
    <p class="section-label">Community</p>
    <p class="section-title">Join Our Telegram Group</p>

    <div class="telegram-card">
      <!-- Info side -->
      <div class="telegram-info">
        <div class="tg-icon-wrap">
          <i class="fa-brands fa-telegram"></i>
        </div>
        <div>
          <h2>AzureDevOpsPro</h2>
          <p style="margin-top:0.5rem;">
            A global community of DevOps professionals sharing
            knowledge, solutions, and career growth tips — in real time.
          </p>
        </div>
        <div class="tg-stats">
          <div class="tg-stat-item">
            <span class="tg-stat-num">7k+</span>
            <span class="tg-stat-label">Members</span>
          </div>
          <div class="tg-stat-item">
            <span class="tg-stat-num">Daily</span>
            <span class="tg-stat-label">Active Discussions</span>
          </div>
        </div>
        <a href="https://t.me/azuredevopspro" class="btn btn-primary" target="_blank" rel="noopener" style="align-self:flex-start;">
          <i class="fa-brands fa-telegram"></i> Join t.me/azuredevopspro
        </a>
      </div>

      <!-- Chat simulation -->
      <div class="telegram-chat">
        <div class="chat-header">
          <div class="chat-avatar"><i class="fa-brands fa-telegram"></i></div>
          <div class="chat-header-info">
            <div class="chat-header-name">AzureDevOpsPro</div>
            <div class="chat-header-sub">7,426 members online</div>
          </div>
        </div>
        <div class="chat-messages" id="chat-messages">
          <div class="chat-bubble theirs" style="animation-delay:0.1s">
            <span class="bubble-sender">Priya K.</span>
            <div class="bubble-text">Just deployed to AKS using Azure DevOps pipeline 🚀 took 4 mins end to end!</div>
            <span class="bubble-time">17:02</span>
          </div>
          <div class="chat-bubble theirs" style="animation-delay:0.3s">
            <span class="bubble-sender">Rahul M.</span>
            <div class="bubble-text">Nice! Are you using Helm or Kustomize for manifests?</div>
            <span class="bubble-time">17:03</span>
          </div>
          <div class="chat-bubble mine" style="animation-delay:0.5s">
            <div class="bubble-text">Helm with value overrides per env. Works great with Azure DevOps variable groups 💡</div>
            <span class="bubble-time">17:04</span>
          </div>
          <div class="chat-bubble theirs" style="animation-delay:0.7s">
            <span class="bubble-sender">Ashish Raj</span>
            <div class="bubble-text">Check out the Bicep module approach I shared last week — cleaner IaC for AKS too 📚</div>
            <span class="bubble-time">17:05</span>
          </div>
          <div class="chat-bubble theirs" style="animation-delay:0.9s">
            <span class="bubble-sender">Jonas W.</span>
            <div class="bubble-text">This community is gold 🙌 learning something new every day</div>
            <span class="bubble-time">17:06</span>
          </div>
        </div>
        <div class="chat-input-bar">
          <div class="chat-input-mock">Join to participate...</div>
          <div class="chat-send-btn"><i class="fa-solid fa-paper-plane"></i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- =========================================================
     YOUTUBE VIDEOS
     ========================================================= -->
<section class="yt-section">
  <div class="container">
    <div class="yt-section-header">
      <div>
        <p class="section-label">YouTube</p>
        <p class="section-title">Latest Videos</p>
      </div>
      <a href="https://youtube.com/@azuredevopspro" class="btn btn-outline" target="_blank" rel="noopener" id="yt-subscribe-btn">
        <i class="fa-brands fa-youtube" style="color:var(--yt-red)"></i> Subscribe
      </a>
    </div>

    <!-- Channel strip -->
    <div class="yt-channel-strip" id="yt-channel-strip">
      <div class="skeleton" style="width:56px;height:56px;border-radius:50%;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div class="skeleton" style="height:16px;width:160px;margin-bottom:8px;"></div>
        <div class="skeleton" style="height:12px;width:240px;"></div>
      </div>
    </div>

    <!-- Video grid -->
    <div class="videos-grid" id="video-gallery">
      <!-- Skeleton placeholders -->
      <div class="video-card"><div class="skeleton" style="aspect-ratio:16/9;"></div><div style="padding:1rem;"><div class="skeleton" style="height:14px;margin-bottom:8px;"></div><div class="skeleton" style="height:14px;width:70%;"></div></div></div>
      <div class="video-card"><div class="skeleton" style="aspect-ratio:16/9;"></div><div style="padding:1rem;"><div class="skeleton" style="height:14px;margin-bottom:8px;"></div><div class="skeleton" style="height:14px;width:70%;"></div></div></div>
      <div class="video-card"><div class="skeleton" style="aspect-ratio:16/9;"></div><div style="padding:1rem;"><div class="skeleton" style="height:14px;margin-bottom:8px;"></div><div class="skeleton" style="height:14px;width:70%;"></div></div></div>
    </div>
  </div>
</section>

<!-- =========================================================
     BOOKS
     ========================================================= -->
<section class="books-section">
  <div class="container">
    <p class="section-label">Publications</p>
    <p class="section-title">My Books</p>
    <p class="section-subtitle">Deep-dive guides on Azure DevOps and cloud-native engineering.</p>

    <div class="books-grid" id="books-gallery" style="margin-top:2rem;">
      <!-- Populated by JS -->
    </div>
  </div>
</section>

<!-- =========================================================
     LINKS — BLOG & RESUME
     ========================================================= -->
<section class="links-section">
  <div class="container">
    <p class="section-label">Explore More</p>
    <p class="section-title">What else I share</p>

    <div class="links-grid" style="margin-top:2rem;">
      <a href="{{ '/blog/' | relative_url }}" class="link-card card-blog">
        <div class="link-card-icon icon-green">
          <i class="fa-solid fa-pen-nib"></i>
        </div>
        <h3>Technical Blog</h3>
        <p>In-depth articles on Azure DevOps, IaC, Kubernetes, CI/CD patterns, and cloud architecture.</p>
        <span class="link-arrow">Read articles →</span>
      </a>

      <a href="http://resume.azuredevopspro.com/" class="link-card card-resume" target="_blank" rel="noopener">
        <div class="link-card-icon icon-blue">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <h3>Interactive Resume</h3>
        <p>Explore my professional background, certifications, projects, and published books in one place.</p>
        <span class="link-arrow">View resume →</span>
      </a>
    </div>
  </div>
</section>
