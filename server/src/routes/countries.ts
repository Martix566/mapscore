import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

// Get all countries
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM countries ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Get country by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM countries WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country' });
  }
});

export default router;
