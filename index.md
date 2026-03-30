---
layout: default
title: Home
---

<!-- Inject YouTube data into window for JavaScript -->
<script>
  window.YOUTUBE_DATA = {{ site.data.youtube | jsonify }};
</script>

<!-- Hero Section -->
<section class="hero">
  <h1>Azure DevOps Pro</h1>
  <p>DevOps is culture, tools are outcome 🚀</p>
  <p>Learn Azure DevOps, GitOps, CI/CD, Infrastructure as Code, and build unstoppable cloud-native solutions</p>
</section>

<!-- Telegram Community Section -->
<section class="telegram-intro">
  <h2>Join Our Telegram Community 💬</h2>
  <p>Connect with thousands of DevOps professionals, share knowledge, ask questions, and grow together</p>
  <p>Our vibrant community is where DevOps culture happens in real-time</p>
  <a href="https://t.me/azuredevopspro" class="button button-secondary" target="_blank">🔗 Join t.me/azuredevopspro</a>
</section>

<!-- Books Section -->
<section>
  <h2>📚 My Published Books</h2>
  <p>Comprehensive guides on Azure DevOps and cloud-native DevOps practices</p>
  <div class="grid" id="books-gallery">
    <!-- Books will be populated by JavaScript -->
  </div>
</section>

<!-- YouTube Channel Section -->
<section>
  <div id="youtube-header" class="youtube-header loading">
    <!-- Channel info will be populated by YouTube API -->
  </div>

  <h2>Latest YouTube Videos</h2>
  <div class="grid" id="video-gallery">
    <!-- Videos will be populated by YouTube API -->
  </div>
</section>

<!-- Training & Community Section -->
<section class="features">
  <h2>Free Training Sessions</h2>
  <ul>
    <li><strong>Azure DevOps Pipelines</strong> - Build robust CI/CD for Azure, Kubernetes, and hybrid apps</li>
    <li><strong>Infrastructure as Code</strong> - ARM, Bicep, Terraform best practices and patterns</li>
    <li><strong>Site Reliability & Observability</strong> - Monitoring, alerts, and cost optimization</li>
    <li><strong>GitOps & Cloud-Native</strong> - Modern deployment strategies and best practices</li>
  </ul>
</section>

<!-- Call to Action -->
<section style="text-align: center; padding: 3rem 0;">
  <h2>Get Started Today</h2>
  <p>Join our community, learn from industry experts, and master DevOps on Azure</p>
  <a href="https://t.me/azuredevopspro" class="button" target="_blank">Join Telegram Community</a>
  <a href="mailto:contact@azuredevopspro.com" class="button button-secondary">Contact Us</a>
</section>
