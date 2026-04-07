---
layout: default
title: Blog
description: "Technical articles on Azure DevOps, Terraform, Bicep, Kubernetes, CI/CD, and cloud-native engineering."
permalink: /blog/
---

<section class="blog-page">
  <div class="container">
    <p class="section-label">Writing</p>
    <h1 class="section-title">Technical Blog</h1>
    <p class="section-subtitle" style="color:var(--text-secondary);margin-top:0.5rem;">
      Deep dives into Azure DevOps, IaC, GitOps, and cloud engineering patterns.
    </p>

    {% assign posts = site.posts %}
    {% if posts.size > 0 %}
      <div class="blog-list">
        {% for post in posts %}
          <a href="{{ post.url }}" class="blog-post-item">
            <span class="blog-post-title">{{ post.title }}</span>
            <span class="blog-post-date">{{ post.date | date: "%b %d, %Y" }}</span>
          </a>
        {% endfor %}
      </div>
    {% else %}
      <div style="margin-top:3rem; padding:3rem 2rem; text-align:center; background:var(--bg-surface); border:1px solid var(--border); border-radius:var(--radius-md);">
        <p style="font-family:var(--font-mono); color:var(--text-muted); font-size:0.9rem;">
          <span style="color:var(--accent-green)">❯</span> No posts yet.
          <span style="color:var(--accent-blue)">// coming soon</span>
        </p>
        <p style="color:var(--text-secondary); margin-top:1rem; font-size:0.9rem;">
          In the meantime, find me on
          <a href="https://t.me/azuredevopspro" target="_blank" rel="noopener">Telegram</a>
          and <a href="https://youtube.com/@azuredevopspro" target="_blank" rel="noopener">YouTube</a>.
        </p>
      </div>
    {% endif %}
  </div>
</section>
