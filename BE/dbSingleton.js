//dbSingleton.js
const mysql = require("mysql2");

let connection; // Variable for storing a single connection

const dbSingleton = {
  getConnection: () => {
    if (!connection) {
      // Create a connection only once
      let dbConfig;
      
      if (process.env.MYSQL_URL) {
        // Use Railway MySQL URL format
        const url = new URL(process.env.MYSQL_URL);
        dbConfig = {
          host: url.hostname,
          user: url.username,
          password: url.password,
          database: url.pathname.substring(1), // Remove leading slash
          port: url.port || 3306,
        };
      } else {
        // Fallback to individual environment variables
        dbConfig = {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "root",
          password: process.env.DB_PASSWORD || "",
          database: process.env.DB_NAME || "phonebook",
          port: process.env.DB_PORT || 3306,
        };
      }
      
      connection = mysql.createConnection(dbConfig);

      // Connect to the database
      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to database:", err);
          throw err;
        }
        console.log("Connected to MySQL!");
      });

      // Handle connection errors
      connection.on("error", (err) => {
        console.error("Database connection error:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          connection = null; // Update the connection state
        }
      });
    }

    return connection; // Return the current connection
  },
};

module.exports = dbSingleton;
