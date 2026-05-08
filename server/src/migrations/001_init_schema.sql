-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  code VARCHAR(3) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  is_fictional BOOLEAN DEFAULT FALSE
);

-- Sports table
CREATE TABLE IF NOT EXISTS sports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  home_country_id INT REFERENCES countries(id),
  away_country_id INT REFERENCES countries(id),
  sport_id INT REFERENCES sports(id),
  home_score INT DEFAULT 0,
  away_score INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, live, finished
  scheduled_time TIMESTAMP,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match details (for sets in volleyball, games in tennis, etc.)
CREATE TABLE IF NOT EXISTS match_details (
  id SERIAL PRIMARY KEY,
  match_id INT REFERENCES matches(id),
  set_or_game_number INT,
  home_score INT,
  away_score INT
);

-- Commentators
CREATE TABLE IF NOT EXISTS commentators (
  id SERIAL PRIMARY KEY,
  match_id INT REFERENCES matches(id),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'commentator'
);

-- User favorite countries
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  country_id INT REFERENCES countries(id),
  UNIQUE(user_id, country_id)
);

-- Standings (for each sport/league)
CREATE TABLE IF NOT EXISTS standings (
  id SERIAL PRIMARY KEY,
  country_id INT REFERENCES countries(id),
  sport_id INT REFERENCES sports(id),
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  draws INT DEFAULT 0,
  points INT DEFAULT 0
);

-- NWM Basketball League
CREATE TABLE IF NOT EXISTS nwm_teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  group_name VARCHAR(50), -- 'Wojtek Group' or 'March Group'
  city VARCHAR(50),
  wins INT DEFAULT 0,
  losses INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nwm_games (
  id SERIAL PRIMARY KEY,
  home_team_id INT REFERENCES nwm_teams(id),
  away_team_id INT REFERENCES nwm_teams(id),
  home_score INT,
  away_score INT,
  game_type VARCHAR(20), -- 'regular', 'playoff_r16', 'quarterfinal', 'semifinal', 'final'
  scheduled_time TIMESTAMP,
  is_home_game BOOLEAN DEFAULT TRUE
);
