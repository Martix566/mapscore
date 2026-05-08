import express from 'express';
import cors from 'cors';
import http from 'http';
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
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/countries', countryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'MapScore Server is running' });
});

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
  console.log(`\n✅ MapScore Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`🔐 JWT Secret is set to: ${process.env.JWT_SECRET || 'default_secret'}`);
  console.log(`\n🎮 Admin Credentials:`);
  console.log('   ANTONI, MARCIN, WOJTEK\n');
});
