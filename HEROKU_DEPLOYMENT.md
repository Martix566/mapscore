# Heroku Deployment Guide for MapScore

## Prerequisites
- Heroku account (free at https://www.heroku.com)
- Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
- Git installed

## Steps to Deploy

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create a new Heroku app
```bash
heroku create mapscore-yourname
```
Replace `yourname` with something unique (no spaces, lowercase)

### 3. Add PostgreSQL Database
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### 4. Set Environment Variables
```bash
heroku config:set JWT_SECRET=your_super_secret_jwt_key_here
heroku config:set NODE_ENV=production
```

### 5. Deploy to Heroku
```bash
git push heroku main
```

### 6. Run Database Migrations
```bash
heroku run "psql -f server/src/migrations/001_init_schema.sql"
heroku run "psql -f server/src/migrations/002_insert_countries.sql"
heroku run "psql -f server/src/migrations/003_insert_sports.sql"
```

### 7. View Your App
```bash
heroku open
```

Your app will be live at: `https://mapscore-yourname.herokuapp.com`

## Troubleshooting

Check logs:
```bash
heroku logs --tail
```

Restart dyno:
```bash
heroku dyno:restart
```

Check config:
```bash
heroku config
```
