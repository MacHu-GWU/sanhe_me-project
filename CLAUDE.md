# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hybrid Next.js + Flask application that combines a React frontend with a Python backend API. The architecture allows seamless integration between Next.js and Flask, with automatic proxy routing in development and serverless function deployment in production on Vercel.

## Development Commands

### Start Development Servers
```bash
npm run dev              # Runs both Next.js and Flask servers concurrently
npm run next-dev         # Next.js frontend only (port 3000)
npm run flask-dev        # Flask backend only (port 5328)
```

### Build and Deploy
```bash
npm run build           # Build Next.js for production
npm run start           # Start production Next.js server
npm run lint            # Run ESLint
```

### Dependencies
```bash
npm install             # Install Node.js dependencies
.venv/bin/pip install -r requirements.txt  # Install Python dependencies (auto-runs in flask-dev)
```

## Architecture

### Frontend-Backend Integration
- **Development**: Next.js proxies `/api/*` requests to Flask server on `127.0.0.1:5328`
- **Production**: Flask routes become Vercel serverless functions
- **Configuration**: `next.config.js` handles environment-aware routing

### Key Files
- `next.config.js`: Critical rewrites configuration for API proxy
- `api/index.py`: Main Flask application with API routes
- `app/`: Next.js 13 App Router structure
- `requirements.txt`: Python dependencies for Flask

### API Routing Pattern
All Flask routes must use `/api/` prefix to match Next.js proxy configuration:
```python
@app.route("/api/python")  # Accessible at localhost:3000/api/python
```

### Port Configuration
- Next.js: `3000` (default)
- Flask: `5328` (configured in package.json and next.config.js)

## Technology Stack

### Frontend
- Next.js 13 with App Router
- TypeScript
- Tailwind CSS with custom gradient configurations
- React 18

### Backend  
- Flask 3.0.3
- Python 3
- Designed for Vercel serverless functions

## Development Workflow

1. Both servers run concurrently using `concurrently` package
2. Flask dependencies auto-install during development
3. API requests from frontend automatically proxy to Flask in development
4. Hot reloading available for both frontend and backend

## Deployment

Configured for zero-config Vercel deployment where Flask routes automatically become serverless functions. The `next.config.js` rewrites handle the environment differences transparently.