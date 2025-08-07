//dbSingleton.js
const mysql = require("mysql2");

let connection; // Variable for storing a single connection

const dbSingleton = {
  getConnection: () => {
    if (!connection) {
      // Create a connection only once
      connection = mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "phonebook",
        port: process.env.DB_PORT || 3306,
      });

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
