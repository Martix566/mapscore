import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = express.Router();
const ADMIN_PASSWORDS = ['ANTONI', 'MARCIN', 'WOJTEK'];

interface AuthRequest extends Request {
  user?: any;
}

// Register/Login
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const { phone_number, username, password, admin_password } = req.body;

    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE phone_number = $1 OR username = $2',
      [phone_number, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin
    const isAdmin = admin_password && ADMIN_PASSWORDS.includes(admin_password);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (phone_number, username, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, username, is_admin',
      [phone_number, username, hashedPassword, isAdmin]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret');

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret');

    res.json({ user: { id: user.id, username: user.username, is_admin: user.is_admin }, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
