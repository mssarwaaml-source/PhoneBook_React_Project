//dbSingleton.js
const mysql = require('mysql2/promise');

let connection = null;

const createConnection = async () => {
  try {
    // For Netlify deployment - support multiple database types
    let config = {};
    
    if (process.env.DATABASE_URL) {
      // Parse DATABASE_URL (works for both Supabase and Railway)
      const url = new URL(process.env.DATABASE_URL);
      config = {
        host: url.hostname,
        port: url.port || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1), // Remove leading slash
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      };
    } else {
      // Fallback to individual environment variables
      config = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'phonebook',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      };
    }

    connection = await mysql.createConnection(config);
    console.log('Connected to MySQL!');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const getConnection = async () => {
  if (!connection) {
    connection = await createConnection();
  }
  
  // Check if connection is still alive
  try {
    await connection.ping();
  } catch (error) {
    console.log('Connection lost, reconnecting...');
    connection = await createConnection();
  }
  
  return connection;
};

const closeConnection = async () => {
  if (connection) {
    await connection.end();
    connection = null;
  }
};

module.exports = {
  getConnection,
  closeConnection
};
