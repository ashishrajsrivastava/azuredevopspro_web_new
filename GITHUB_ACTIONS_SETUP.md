# GitHub Actions Setup Guide

This guide will help you set up your YouTube integration securely using GitHub Secrets and Actions.

## 🔒 What's Changed (Security Improvement)

Previously, the YouTube API key was stored directly in your JavaScript file (`assets/js/youtube-api.js`), which is a security risk when pushing to a public repository.

**Now:**
- ✅ API key is stored securely in GitHub Secrets
- ✅ Data is fetched at **build time** via GitHub Actions
- ✅ Static data is served from Jekyll (fast & secure)
- ✅ No API calls from the browser (no CORS issues)

## 📋 Setup Steps

### Step 1: Get Your YouTube Channel ID

1. Visit your YouTube channel: https://www.youtube.com/c/ashishrajsrivastava
2. Click **"About"** tab
3. Look for your Channel ID (appears in URL as `/channel/UC...`)
4. Copy it (example: `UC6jSaKXd6gw-xdEwtGk-NcA`)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

**Create two secrets:**

| Secret Name | Value |
|-------------|-------|
| `YOUTUBE_API_KEY` | Your YouTube API key (starts with `AIzaSy...`) |
| `YOUTUBE_CHANNEL_ID` | Your Channel ID (e.g., `UC6jSaKXd6gw-xdEwtGk-NcA`) |

**Example:**
```
YOUTUBE_API_KEY = AIzaSyB0DSZHYWMdIXXVUE3rvPJqGhcwwjsznVw
YOUTUBE_CHANNEL_ID = UC6jSaKXd6gw-xdEwtGk-NcA
```

### Step 3: Push to GitHub

The GitHub Actions workflow in `.github/workflows/build.yml` is already configured. When you push to `main` or `master` branch:

1. ✅ GitHub Actions runs automatically
2. ✅ Fetches your latest YouTube data using the API
3. ✅ Generates `_data/youtube.json` 
4. ✅ Builds your Jekyll site with the static data
5. ✅ Deploys to GitHub Pages

## 🧪 Testing Locally

### Test the script locally:

```bash
# Set environment variables
export YOUTUBE_API_KEY="your-api-key-here"
export YOUTUBE_CHANNEL_ID="your-channel-id-here"

# Run the fetch script
node scripts/fetch-youtube-data.js

# Build and serve Jekyll
bundle exec jekyll serve
```

### What to expect:

1. `scripts/fetch-youtube-data.js` creates `_data/youtube.json`
2. Your site displays the YouTube data
3. If API fails, fallback data is shown

## 📁 Files Structure

```
.github/workflows/build.yml          # GitHub Actions workflow
scripts/fetch-youtube-data.js        # Node.js script to fetch YouTube data
_data/youtube.json                   # Generated data (gitignored)
assets/js/youtube-api.js             # Frontend JS (loads static data)
index.md                             # Injects YOUTUBE_DATA into window
```

## 🔄 How it Works: Workflow Flow

```
1. You push to main/master
   ↓
2. GitHub Actions triggers build.yml
   ↓
3. Node.js script runs with API key from secrets
   ↓
4. YouTube data fetched → _data/youtube.json
   ↓
5. Jekyll builds site with data
   ↓
6. Site deployed to GitHub Pages
   ↓
7. Browser loads static data (no API calls!)
```

## ⚠️ Troubleshooting

### Videos not showing?

1. Check **Actions** tab in GitHub
2. Click latest workflow run
3. Look for errors in logs
4. Verify API key and Channel ID are correct in Secrets

### Build failed?

Your workflow logs will show:
- ✅ Channel fetched successfully
- ❌ API key error (check Secrets)
- ❌ Channel ID error (check Secrets)

### Manual Workflow Trigger

You can manually trigger the workflow to fetch data:

1. Go to **Actions** tab
2. Click **Build and Deploy** workflow
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow**

## 🎯 What About Local jekyll serve?

When running locally with `bundle exec jekyll serve`:

- If `_data/youtube.json` exists → Uses that data
- If file doesn't exist → Shows placeholder data
- Run `node scripts/fetch-youtube-data.js` locally first to populate it

## ✅ Success Indicators

- [ ] Secrets added to GitHub
- [ ] Pushed code to main/master
- [ ] GitHub Actions ran successfully (check Actions tab)
- [ ] `_data/youtube.json` file appears in repository
- [ ] Website shows YouTube videos and channel info
- [ ] Videos update automatically when you publish new content

## 🔐 Security Best Practices

✅ API key is in GitHub Secrets (not in code)
✅ Key is not logged in Actions output
✅ Only used server-side during build
✅ Static data served to users (no exposed keys)
✅ `.gitignore` prevents accidental commits

---

**Questions?** Check your GitHub Actions logs for detailed error messages!
