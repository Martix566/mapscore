# MapScore - Sports Match Simulation Platform

A comprehensive sports match simulation platform with AI-generated matches, admin panel, and real-time updates.

## Features

- **Multi-Sport Support**: Football, Basketball, Volleyball, Tennis, Hockey, and more
- **195 Real Countries + 12 Fictional Countries**: Complete country database
- **Admin Panel**: Create, manage, and simulate matches
- **Live Match Simulation**: Real-time updates with Socket.io
- **Standings & Tables**: Track wins, losses, draws, and points
- **NWM Basketball League**: Professional league with 40 teams and playoff system
- **User Accounts**: Registration and login with favorite country tracking

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Real-time**: Socket.io
- **Authentication**: JWT + bcrypt

## Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Martix566/mapscore.git
cd mapscore
```

2. Create PostgreSQL database
```bash
creatdb mapscore
```

3. Install dependencies
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

4. Setup environment variables
```bash
cp .env.example .env
```
Edit `.env` with your database credentials

5. Run database migrations
```bash
psql -U postgres -d mapscore -f server/src/migrations/001_init_schema.sql
psql -U postgres -d mapscore -f server/src/migrations/002_insert_countries.sql
psql -U postgres -d mapscore -f server/src/migrations/003_insert_sports.sql
```

6. Start development servers
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Admin Credentials

Use one of these passwords during registration to create an admin account:
- ANTONI
- MARCIN
- WOJTEK

## Project Structure

```
mapscore/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── migrations/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.tsx
│   └── package.json
└── package.json
```

## Contributing

Contributions are welcome! Please create a new branch for each feature or bug fix.

## License

MIT
