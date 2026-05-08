# MapScore - Sports Match Simulation Platform

🎮 **Live Demo:** (Deploy link will appear here after deployment)

A comprehensive sports match simulation platform with AI-generated matches, admin panel, and real-time updates.

## 🌟 Features

- **Multi-Sport Support**: Football, Basketball, Volleyball, Tennis, Hockey, and more
- **195 Real Countries + 12 Fictional Countries**: Complete country database
- **Admin Panel**: Create, manage, and simulate matches
- **Live Match Simulation**: Real-time updates with Socket.io
- **Standings & Tables**: Track wins, losses, draws, and points
- **NWM Basketball League**: Professional league with 40 teams and playoff system
- **User Accounts**: Registration and login with favorite country tracking
- **JWT Authentication**: Secure login with bcrypt password hashing

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Socket.io Client for real-time updates

**Backend:**
- Node.js with Express
- TypeScript
- PostgreSQL database
- Socket.io for WebSocket communication
- JWT + bcrypt for authentication

**Deployment:**
- Ready for Heroku
- Ready for Vercel (Frontend)

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Martix566/mapscore.git
cd mapscore

# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..

# Create PostgreSQL database
creatdb mapscore

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
psql -U postgres -d mapscore -f server/src/migrations/001_init_schema.sql
psql -U postgres -d mapscore -f server/src/migrations/002_insert_countries.sql
psql -U postgres -d mapscore -f server/src/migrations/003_insert_sports.sql

# Start development servers
npm run dev
```

The app will be available at `http://localhost:3000`

## 🔐 Admin Credentials

Use one of these passwords during registration to create an admin account:
- **ANTONI**
- **MARCIN**
- **WOJTEK**

### Example Admin Login:
```
Username: admin
Password: 1234
Phone: 888 741 389
Admin Password: ANTONI
```

## 📱 Project Structure

```
mapscore/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── migrations/
│   │   │   ├── 001_init_schema.sql
│   │   │   ├── 002_insert_countries.sql
│   │   │   └── 003_insert_sports.sql
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── matches.ts
│   │   │   └── countries.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── Procfile
├── package.json
├── .env.example
├── .gitignore
├── HEROKU_DEPLOYMENT.md
├── VERCEL_DEPLOYMENT.md
└── README.md
```

## 🚀 Deployment

### Deploy to Heroku

See [HEROKU_DEPLOYMENT.md](HEROKU_DEPLOYMENT.md) for detailed instructions.

```bash
heroku create mapscore-yourname
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Deploy Frontend to Vercel

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.

```bash
cd client
vercel
```

## 📊 Database

### Tables
- **users**: User accounts with admin support
- **countries**: 195 real countries + 12 fictional ones
- **sports**: Available sports (Football, Basketball, etc.)
- **matches**: Match records with scores and times
- **match_details**: Set/game details for Volleyball, Tennis, etc.
- **commentators**: Match commentators
- **standings**: Country standings and statistics
- **nwm_teams**: NWM Basketball League teams
- **nwm_games**: NWM Basketball League games

## 🎯 Features in Development

- [ ] Real-time match simulation engine
- [ ] AI-generated commentary
- [ ] Video panel integration
- [ ] Match animations
- [ ] Leaderboards
- [ ] User statistics
- [ ] Social features

## 🤝 Contributing

Contributions are welcome! Please create a new branch for each feature or bug fix.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

## 📄 License

MIT

## 👨‍💻 Author

Created by **Martix566**

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Made with ❤️ by Martix566**
