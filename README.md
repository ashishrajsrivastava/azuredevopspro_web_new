# Azure DevOps Pro (GitHub Pages)

Static site scaffold for https://www.azuredevopspro.com built for GitHub Pages.

## Features implemented
- Jekyll-based site with `index`, `about`, `contact` pages.
- Blog section currently inactive (hidden in navigation), but markdown-based workflow supported.
- Easy blog authoring using `_posts/YYYY-MM-DD-title.md`.
- Responsive minimal CSS.
- `404` page and site metadata.

## Local development
1. Install Ruby, Bundler, Jekyll (if not installed):
   - `gem install bundler jekyll`
2. Run server:
   - `bundle exec jekyll serve --livereload`
3. Open `http://127.0.0.1:4000`.

## GitHub Pages deployment
1. Create repository `github-username.github.io` or use a project page.
2. Push all files.
3. Enable Pages on main branch in repository Settings.

## Add blog post
1. Create file in `_posts/` with YAML front matter:
   ```yaml
   ---
   layout: post
   title: "First Blog"
   date: 2026-03-30
   categories: [blog, azure-devops]
   ---
   ```
2. Write content in markdown.
3. Commit and push.

## Exclude blog from homepage
- `index.md` currently has a "Blog (Coming Soon)" section.
- No post loop is rendered until you add `blog.html` or include logic in layout.
