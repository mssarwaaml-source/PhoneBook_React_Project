const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  const { user } = req.session;
  const query = "SELECT * FROM contacts WHERE user_id = ?";
  try {
    db.query(query, [user.user_id], (err, result) => {
      if (err) {
        res.json({ message: "Error", error: err });
      } else {
        res.json({ message: "Success", contacts: result });
      }
    });
  } catch (error) {}
});

router.get("/get/:contact_id", (req, res) => {
  const { user } = req.session;
  const { contact_id } = req.params;
  const query = "SELECT * FROM contacts WHERE contact_id = ? AND user_id = ?";
  db.query(query, [contact_id, user.user_id], (err, result) => {
    res.json({ message: "Success", contact: result });
  });
});

router.put("/update/:contact_id", upload.single("image"), (req, res) => {
  const { user } = req.session;
  const { contact_id } = req.params;
  const { name, email, phone } = req.body;
  let imagePath = req.file ? req.file.filename : null;
  db.query(
    `SELECT * FROM contacts WHERE contact_id = ? AND user_id = ?`,
    [contact_id, user.user_id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error" });
      } else if (result.length > 0) {
        db.query(
          `SELECT * FROM contacts WHERE phone = ? AND user_id = ?`,
          [phone, user.user_id],
          (err, resultphone) => {
            if (err) {
              res.json({ message: "Error" });
            } else if (
              resultphone.length > 0 &&
              parseInt(resultphone[0].contact_id) !== parseInt(contact_id)
            ) {
              res.json({ message: "existcontact" });
              if (imagePath) {
                fs.unlink(`images/${imagePath}`, (err) => {
                  if (err) {
                    return res.json({ message: "Error" });
                  }
                });
              }
            } else {
              if (result[0].image && imagePath) {
                fs.unlink(`images/${result[0].image}`, (err) => {
                  if (err) {
                    return res.json({ message: "Error" });
                  }
                });
              }
              const query = `UPDATE contacts SET name = ?, email = ?, phone = ?, image = ? WHERE contact_id = ? AND user_id = ?`;
              if (!imagePath) {
                imagePath = result[0].image;
              }
              db.query(
                query,
                [name, email, phone, imagePath, contact_id, user.user_id],
                (err, result) => {
                  if (err) {
                    res.json({ message: "Error" });
                  } else {
                    res.json({ message: "Success" });
                  }
                }
              );
            }
          }
        );
      } else {
        res.json({ message: "Contact not found" });
      }
    }
  );
});

router.post("/add", upload.single("image"), (req, res) => {
  const { name, email, phone } = req.body;
  const { user } = req.session;
  const imagePath = req.file ? req.file.filename : null;

  db.query(
    `SELECT * FROM contacts WHERE phone = ? AND user_id = ?`,
    [phone, user.user_id],
    (err, results) => {
      if (err) {
        res.json({ message: "Error" });
      } else if (results.length > 0) {
        if (imagePath) {
          fs.unlink(`images/${imagePath}`, (err) => {
            if (err) {
              return res.json({ message: "Error" });
            }
          });
        }
        res.json({ message: "existcontact" });
      } else {
        const query = `INSERT INTO contacts (user_id, name, email, phone, image) VALUES (?, ?, ?, ?, ?)`;

        db.query(
          query,
          [user.user_id, name, email, phone, imagePath],
          (err, result) => {
            if (err) {
              res.json({ message: "Error" });
            } else {
              res.json({ message: "Success" });
            }
          }
        );
      }
    }
  );
});

router.delete("/delete/:contact_id", (req, res) => {
  const { user } = req.session;
  const { contact_id } = req.params;
  const { image } = req.query;

  db.query(
    `DELETE FROM contacts WHERE contact_id = ? AND user_id = ?`,
    [contact_id, user.user_id],
    (err, result) => {
      if (err) {
        res.json({ message: "Error" });
      } else {
        if (image !== "empty") {
          fs.unlink(`images/${image}`, (err) => {
            if (err) {
              res.json({ message: "Error" });
            }
          });
        }
        res.json({ message: "Success" });
      }
    }
  );
});

module.exports = router;
