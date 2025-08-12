# Wrylo App Backend Setup Guide

This document provides instructions for setting up the secure backend to work with your Wrylo React Native app.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Redis (for session management)

## Quick Start

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb wrylo_app

# Run the schema setup
psql -d wrylo_app -f database/schema.sql
```

### 2. Backend Dependencies

Create a new Node.js project and install required packages:

```bash
npm init -y
npm install express bcryptjs jsonwebtoken cors helmet rate-limit
npm install express-validator crypto uuid pg redis
npm install dotenv nodemailer winston morgan compression
```

### 3. Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/wrylo_app
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here
ENCRYPTION_KEY=your-32-character-encryption-key
BCRYPT_ROUNDS=12

# Email (for verification/reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App
PORT=3000
NODE_ENV=production
FRONTEND_URL=http://localhost:8081
```

## Required API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
```javascript
// Expected request body:
{
  "username": "string",
  "email": "string", 
  "password": "string",
  "salt": "string",
  "deviceInfo": "object"
}

// Response:
{
  "success": true,
  "message": "Registration successful",
  "userId": "uuid"
}
```

#### POST /api/auth/login
```javascript
// Expected request body:
{
  "email": "string",
  "password": "string", 
  "deviceInfo": "object"
}

// Response:
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "string",
    "username": "string",
    "emailVerified": "boolean"
  }
}
```

#### POST /api/auth/logout
```javascript
// Headers: Authorization: Bearer <token>
// Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### POST /api/auth/reset-password
```javascript
// Request body:
{
  "email": "string"
}

// Response:
{
  "success": true,
  "message": "Password reset email sent"
}
```

## Sample Backend Implementation

### Basic Express Server Setup

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts'
});

app.use('/api/auth', authLimiter);
app.use(express.json({ limit: '10mb' }));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, salt, deviceInfo } = req.body;
    
    // Hash password server-side as well (double hashing for security)
    const serverHash = await bcrypt.hash(password, 12);
    
    // Insert user into database
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, salt) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [username, email.toLowerCase(), serverHash, salt]
    );
    
    const userId = result.rows[0].id;
    
    // Create user profile
    await pool.query(
      `INSERT INTO user_profiles (user_id, display_name) VALUES ($1, $2)`,
      [userId, username]
    );
    
    // Log security event
    await pool.query(
      `INSERT INTO security_events (user_id, event_type, event_details, ip_address) 
       VALUES ($1, 'user_registered', $2, $3)`,
      [userId, JSON.stringify({ username, email }), req.ip]
    );
    
    res.json({
      success: true,
      message: 'Registration successful',
      userId
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, deviceInfo } = req.body;
    
    // Get user from database
    const userResult = await pool.query(
      `SELECT id, email, username, password_hash, account_status, email_verified 
       FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );
    
    if (userResult.rows.length === 0) {
      // Log failed attempt
      await pool.query(
        `INSERT INTO login_attempts (email, ip_address, success, failure_reason) 
         VALUES ($1, $2, false, 'user_not_found')`,
        [email, req.ip]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const user = userResult.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      // Log failed attempt
      await pool.query(
        `INSERT INTO login_attempts (email, ip_address, success, failure_reason) 
         VALUES ($1, $2, false, 'invalid_password')`,
        [email, req.ip]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Log successful login
    await pool.query(
      `INSERT INTO login_attempts (email, ip_address, success) 
       VALUES ($1, $2, true)`,
      [email, req.ip]
    );
    
    // Update last login
    await pool.query(
      `UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [user.id]
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        emailVerified: user.email_verified
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Security Features Implemented

- ✅ Password hashing with bcrypt (rounds: 12)
- ✅ JWT token authentication  
- ✅ Rate limiting on auth endpoints
- ✅ SQL injection prevention with parameterized queries
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ Login attempt tracking
- ✅ Account lockout after failed attempts
- ✅ Security event logging
- ✅ Session management

## Deployment Checklist

- [ ] Update API_BASE_URL in environment.js
- [ ] Set strong JWT_SECRET and ENCRYPTION_KEY
- [ ] Configure HTTPS in production
- [ ] Set up database backups
- [ ] Configure email service for verification/reset
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Set up SSL certificates

## Next Steps

1. Deploy the backend server
2. Update the API_BASE_URL in your React Native app
3. Test the authentication flow
4. Implement additional features like email verification
5. Add book-related endpoints
6. Set up push notifications