import express, { Request, Response } from 'express';
import pool from '../config/database';

const router = express.Router();

// Get all matches
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.id, 
        hc.name as home_country,
        ac.name as away_country,
        s.name as sport,
        m.home_score,
        m.away_score,
        m.status,
        m.scheduled_time
      FROM matches m
      JOIN countries hc ON m.home_country_id = hc.id
      JOIN countries ac ON m.away_country_id = ac.id
      JOIN sports s ON m.sport_id = s.id
      ORDER BY m.scheduled_time DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Create match (admin only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { home_country_id, away_country_id, sport_id, home_score, away_score, scheduled_time, created_by } = req.body;

    const result = await pool.query(
      `INSERT INTO matches (home_country_id, away_country_id, sport_id, home_score, away_score, scheduled_time, created_by, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [home_country_id, away_country_id, sport_id, home_score, away_score, scheduled_time, created_by, 'scheduled']
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create match' });
  }
});

export default router;
