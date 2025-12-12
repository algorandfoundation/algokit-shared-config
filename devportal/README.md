# Workflow Helper Scripts

This directory contains helper scripts for GitHub Actions workflows.

## Scripts

### generate-manifest.mjs

Generates a `manifest.json` file for documentation builds with metadata about the documentation generator and build.

**Usage:**
```bash
node generate-manifest.mjs <docs_path> <repository> <commit_sha>
```

**Arguments:**
- `docs_path` - Path to the documentation folder (e.g., "docs")
- `repository` - GitHub repository in format "owner/repo"
- `commit_sha` - Git commit SHA

**Features:**
- Auto-detects documentation generator (Sphinx, TypeDoc, JSDoc)
- Extracts version information from package.json or tool CLI
- Generates ISO 8601 timestamp

**Output:**
Creates a `manifest.json` file in the docs directory:
```json
{
  "generated": "2024-01-15T10:30:00Z",
  "generator": {
    "tool": "typedoc",
    "version": "0.25.0"
  },
  "metadata": {
    "repository": "owner/repo",
    "commit": "abc123def456"
  }
}
```

### notify-devportal.mjs

Sends a GitHub repository dispatch event to notify the DevPortal of a documentation update.

**Usage:**
```bash
node notify-devportal.mjs
```

**Required Environment Variables:**
- `GITHUB_REPOSITORY` - Full repository name (owner/repo)
- `GITHUB_REPOSITORY_OWNER` - Repository owner
- `GITHUB_REPOSITORY_NAME` - Repository name
- `GITHUB_SHA` - Commit SHA
- `GITHUB_EVENT_NAME` - Event type (release, pull_request, etc.)
- `DEVPORTAL_DISPATCH_TOKEN` - GitHub token with repo scope

**Optional Environment Variables:**
- `GITHUB_EVENT_RELEASE_TAG_NAME` - Release tag name (for release events)
- `GITHUB_EVENT_RELEASE_NAME` - Release name (for release events)
- `GITHUB_EVENT_RELEASE_HTML_URL` - Release URL
- `GITHUB_EVENT_RELEASE_CREATED_AT` - Release timestamp
- `GITHUB_EVENT_HEAD_COMMIT_URL` - Commit URL
- `GITHUB_EVENT_HEAD_COMMIT_TIMESTAMP` - Commit timestamp
- `GITHUB_EVENT_INPUTS_REASON` - Manual trigger reason
- `GITHUB_SERVER_URL` - GitHub server URL (default: https://github.com)
- `DEVPORTAL_REPO` - Target DevPortal repository (default: algorandfoundation/devportal)
- `DOCS_BRANCH` - Documentation branch (default: docs-dist)

**Exit Codes:**
- `0` - Success or token not configured (graceful skip)
- `1` - Error (authentication failure, repository not found, etc.)

## Development

These scripts use ES modules (`.mjs` extension) and require Node.js 18+.

No external dependencies are required - scripts use only Node.js built-in modules and the Fetch API (available in Node.js 18+).
