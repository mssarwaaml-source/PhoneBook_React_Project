const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
const bcrypt = require("bcrypt");

router.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ message: "User found", user: req.session.user });
  } else {
    res.json({ message: "User not found" });
  }
});

router.post("/", async (req, res) => {

  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else if (result.length > 0) {
      if (await bcrypt.compare(password, result[0].password)) {
        req.session.user = result[0];
        res.json({ message: "User found", user: result[0] });
      } else {
        res.json({ message: "User not found" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else if (results.length > 0) {
      res.json({ user: "existingUser" });
    } else {
      db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
          res.json({ message: "Error", error: err });
        } else {
          res.json({ message: "User created", user: result });
        }
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "User logged out" });
});

module.exports = router;
