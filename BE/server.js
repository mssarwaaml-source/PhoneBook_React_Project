const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const login_logout = require("./Router/login_logout");
const contacts = require("./Router/contacts");
const groups = require("./Router/groups");

const port = process.env.PORT || 5000;

// CORS configuration for production
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-netlify-app.netlify.app", // Replace with your actual Netlify URL
  "https://your-custom-domain.com", // Replace with your custom domain if any
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

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use("/images", express.static("images"));

app.use("/app/Contacts", contacts);
app.use("/app/Groups", groups);
app.use("/", login_logout);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
