const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

// Import routes
const loginLogoutRoutes = require('../../BE/Router/login_logout');
const contactsRoutes = require('../../BE/Router/contacts');
const groupsRoutes = require('../../BE/Router/groups');

const app = express();

// CORS configuration for Netlify
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all origins for Netlify deployment
    callback(null, true);
  },
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to false for Netlify
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running on Netlify',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api', loginLogoutRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/groups', groupsRoutes);

// Export the serverless function
module.exports.handler = serverless(app);
