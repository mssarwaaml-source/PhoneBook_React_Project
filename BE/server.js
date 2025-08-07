const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

// Import routes
const loginLogoutRoutes = require("./Router/login_logout");
const contactsRoutes = require("./Router/contacts");
const groupsRoutes = require("./Router/groups");

const app = express();

// CORS configuration for production deployment
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-netlify-app.netlify.app", // Update with your Netlify URL
  "https://your-custom-domain.com", // Update with your custom domain if any
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from images directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Health check endpoint for deployment monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes
app.use("/api", loginLogoutRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/groups", groupsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Health check: http://localhost:${port}/health`);
});
