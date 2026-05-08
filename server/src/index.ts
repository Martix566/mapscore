import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import pool from './config/database';
import authRoutes from './routes/auth';
import matchRoutes from './routes/matches';
import countryRoutes from './routes/countries';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/countries', countryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'MapScore Server is running', environment: NODE_ENV });
});

// Serve static files from React build
if (NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/build');
  app.use(express.static(clientBuildPath));

  // Fallback to React for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Socket.io events for real-time match updates
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('watch_match', (matchId) => {
    socket.join(`match_${matchId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.locals.io = io;

server.listen(PORT, () => {
  console.log(`\n✅ MapScore Server running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`🎮 Environment: ${NODE_ENV}`);
  console.log(`🔐 Admin Credentials: ANTONI, MARCIN, WOJTEK\n`);
});
