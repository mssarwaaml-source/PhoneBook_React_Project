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

function combineContacts(group_contact) {
  const grouped = {};

  group_contact.forEach((row) => {
    if (!grouped[row.group_id]) {
      grouped[row.group_id] = {
        group_id: row.group_id,
        group_name: row.group_name,
        group_image: row.group_image,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        contacts: [],
      };
    }

    grouped[row.group_id].contacts.push({
      contact_id: row.contact_id,
      user_id: row.user_id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      image: row.image,
    });
  });

  return Object.values(grouped);
}
function deleteGroup(group_id, res, next) {
  db.query(
    "SELECT * FROM group_contact WHERE group_id = ?",
    [group_id],
    (err, result) => {
      if (err) {
        return res.json({ message: "Error", error: err });
      }
      if (result.length === 0) {
        db.query(
          "SELECT * FROM groups WHERE group_id = ?",
          [group_id],
          (err, result) => {
            if (result[0].group_image) {
              fs.unlink(`images/${result[0].group_image}`, (err) => {
                if (err) {
                  return res.json({ message: "Error", error: err });
                }
              });
            }
          }
        );
        db.query(
          "DELETE FROM groups WHERE group_id = ?",
          [group_id],
          (err, result) => {
            if (err) {
              return res.json({ message: "Error", error: err });
            }

            return res.json({ message: "Success group deleted" });
          }
        );
      } else {
        next();
      }
    }
  );
}

function deleteGroupImage(group_image) {
  fs.unlink(`images/${group_image}`, (err) => {
    if (err) {
      return res.json({ message: "Error", error: err });
    }
  });
}

router.get("/", (req, res) => {
  const { user } = req.session;

  const query = `SELECT *
                    FROM groups g
                    JOIN group_contact gc ON g.group_id = gc.group_id
                    JOIN contacts c ON gc.contact_id = c.contact_id
                    WHERE c.user_id =?`;

  db.query(query, [user.user_id], (err, result) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else {
      res.json({ message: "Success", group_contact: combineContacts(result) });
    }
  });
});

router.delete("/:group_id/:contact_id", (req, res) => {
  const { group_id, contact_id } = req.params;
  const query = `DELETE FROM group_contact WHERE group_id = ? AND contact_id = ?`;

  db.query(query, [group_id, contact_id], (err, result) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else {
      deleteGroup(group_id, res, () => {
        db.query(
          "UPDATE groups SET updatedAt = CURRENT_TIMESTAMP WHERE group_id = ?",
          [group_id],
          (err) => {
            if (err) {
              return res.json({ message: "Error", error: err });
            }

            res.json({
              message: "Success contact removed from group",
              group: result,
            });
          }
        );
      });
    }
  });
});

router.post("/add", upload.single("image"), (req, res) => {
  const { name, contacts } = req.body;
  const { user } = req.session;
  const imagePath = req.file ? req.file.filename : null;
  const contactsJson = JSON.parse(contacts);

  const query = `SELECT * FROM groups WHERE group_name = ? AND user_id = ?`;
  db.query(query, [name, user.user_id], (err, result) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else if (result.length > 0) {
      if (imagePath) {
        deleteGroupImage(imagePath);
      }
      res.json({ message: "existgroup" });
    } else {
      const query = `INSERT INTO groups (user_id, group_name, group_image) VALUES (?, ?, ?)`;
      db.query(query, [user.user_id, name, imagePath], (err, result) => {
        if (err) {
          if (imagePath) {
            deleteGroupImage(imagePath);
          }
          res.json({ message: "Error", error: err });
        } else {
          const group_id = result.insertId;
          contactsJson.forEach((contact) => {
            const query = `INSERT INTO group_contact (group_id, contact_id) VALUES (?, ?)`;
            db.query(query, [group_id, contact], (err, result) => {
              if (err) {
                if (imagePath) {
                  deleteGroupImage(imagePath);
                }
                res.json({ message: "Error", error: err });
              }
            });
          });
          res.json({ message: "Success group added" });
        }
      });
    }
  });
});

router.post("/addcontact", (req, res) => {
  const { group_id, contact_ids } = req.body;
  const query = `INSERT INTO group_contact (group_id, contact_id) VALUES (?, ?)`;
  contact_ids.forEach((contact_id) => {
    db.query(query, [group_id, contact_id], (err, result) => {
      if (err) {
        res.json({
          message: "Error adding contact to group",
          error: err,
        });
      }
    });
  });

  db.query(
    "UPDATE groups SET updatedAt = CURRENT_TIMESTAMP WHERE group_id = ?",
    [group_id],
    (err) => {
      if (err) {
        res.json({
          message: "Error adding contact to group",
          error: err,
        });
      } else {
        res.json({
          message: "Success contact added to group",
        });
      }
    }
  );
});

router.delete("/:group_id", (req, res) => {
  const { group_id } = req.params;
  db.query(
    "SELECT * FROM groups WHERE group_id = ?",
    [group_id],
    (err, result) => {
      if (result[0].group_image) {
        fs.unlink(`images/${result[0].group_image}`, (err) => {
          if (err) {
            return res.json({ message: "Error", error: err });
          }
        });
      }
    }
  );

  const query = `DELETE FROM groups WHERE group_id = ?`;
  db.query(query, [group_id], (err, result) => {
    if (err) {
      res.json({ message: "Error", error: err });
    } else {
      res.json({ message: "Success group deleted" });
    }
  });
});

module.exports = router;
