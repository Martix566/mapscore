# Vercel Deployment Guide for MapScore

## Deploy Frontend to Vercel

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Go to client directory
```bash
cd client
```

### 3. Deploy
```bash
vercel
```

Follow the prompts:
- Select "Y" to create a new project
- Project name: `mapscore`
- Framework: React
- Root directory: `./client`

### 4. Set Environment Variables
In Vercel dashboard:
- Go to Settings > Environment Variables
- Add: `REACT_APP_API_URL=https://your-backend-url`

## Deploy Backend to Heroku (Recommended)

For the backend, use Heroku (see HEROKU_DEPLOYMENT.md)

Then update your frontend environment variable to point to your Heroku backend:
```
REACT_APP_API_URL=https://mapscore-yourname.herokuapp.com
```

## Result
- Frontend: `https://mapscore.vercel.app`
- Backend: `https://mapscore-yourname.herokuapp.com`
