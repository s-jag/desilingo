require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer')
const { Pool } = require('pg')

const app = express()
const port = process.env.PORT || 3000

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack)
    return
  }
  console.log('Successfully connected to database')
  release()
})

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite's default development port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Auth0 middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
})

// Routes
app.get('/api/user/profile', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub
    console.log('Fetching profile for auth0Id:', auth0Id)
    
    const result = await pool.query(
      'SELECT * FROM users WHERE auth0_id = $1',
      [auth0Id]
    )

    if (result.rows.length === 0) {
      console.log('Creating new user for auth0Id:', auth0Id)
      // Create new user if they don't exist with all required fields
      const newUser = await pool.query(
        `INSERT INTO users (
          auth0_id, 
          name, 
          email, 
          native_language, 
          learning_goal, 
          daily_goal
        ) VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
        [
          auth0Id,
          req.auth.payload.name || '',
          req.auth.payload.email || '',
          'English', // default native language
          'Intermediate', // default learning goal
          30, // default daily goal
        ]
      )
      res.json(newUser.rows[0])
    } else {
      res.json(result.rows[0])
    }
  } catch (error) {
    console.error('Detailed error in profile fetch:', {
      error: error.message,
      stack: error.stack,
      auth0Id: req.auth.payload.sub,
      auth0Payload: req.auth.payload
    })
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

app.put('/api/user/profile', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub
    const { name, nativeLanguage, learningGoal, dailyGoal } = req.body

    const result = await pool.query(
      `UPDATE users 
       SET name = $1, 
           native_language = $2, 
           learning_goal = $3, 
           daily_goal = $4
       WHERE auth0_id = $5
       RETURNING *`,
      [name, nativeLanguage, learningGoal, parseInt(dailyGoal, 10), auth0Id]
    )

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(result.rows[0])
    }
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Track study time
app.post('/api/user/track-time', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub
    const { minutes } = req.body
    const today = new Date().toISOString().split('T')[0]

    // Get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE auth0_id = $1',
      [auth0Id]
    )
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const userId = userResult.rows[0].id

    // Update or insert study time for today
    const result = await pool.query(
      `INSERT INTO user_study_time (user_id, date, minutes_spent)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, date)
       DO UPDATE SET minutes_spent = user_study_time.minutes_spent + EXCLUDED.minutes_spent
       RETURNING *`,
      [userId, today, minutes]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error tracking study time:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user statistics
app.get('/api/user/stats', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub

    // Get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE auth0_id = $1',
      [auth0Id]
    )
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const userId = userResult.rows[0].id

    // Get total lessons completed
    const lessonsResult = await pool.query(
      `SELECT COUNT(*) as completed_lessons
       FROM user_lessons
       WHERE user_id = $1 AND status = 'completed'`,
      [userId]
    )

    // Get study time statistics
    const timeStatsResult = await pool.query(
      `WITH daily_stats AS (
         SELECT 
           CASE 
             WHEN ust.date >= CURRENT_DATE - INTERVAL '7 days' 
             THEN ust.minutes_spent 
             ELSE 0 
           END as last_week_minutes,
           ust.minutes_spent as total_minutes
         FROM user_study_time ust
         WHERE ust.user_id = $1
       )
       SELECT 
         COALESCE(SUM(last_week_minutes), 0) as last_week_minutes,
         COALESCE(SUM(total_minutes), 0) as total_minutes
       FROM daily_stats`,
      [userId]
    )

    // Get total XP (placeholder - you'll need to implement XP system)
    const xpResult = await pool.query(
      `SELECT COALESCE(SUM(score), 0) as total_xp
       FROM user_lessons
       WHERE user_id = $1`,
      [userId]
    )

    const stats = {
      daysStreak: timeStatsResult.rows[0].days_streak,
      totalXP: parseInt(xpResult.rows[0].total_xp),
      lessonsCompleted: parseInt(lessonsResult.rows[0].completed_lessons),
      totalHoursSpent: Math.round(timeStatsResult.rows[0].total_hours_spent),
      lastWeekHours: Math.round(timeStatsResult.rows[0].last_week_hours),
      averageDailyMinutes: Math.round(timeStatsResult.rows[0].avg_daily_minutes),
    }

    res.json(stats)
  } catch (error) {
    console.error('Error fetching user statistics:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
}) 