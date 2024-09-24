import express from "express";
import db from "../database/db";

const router = express.Router();

// Get all posts
router.get("/", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ posts: rows });
  });
});

// Create a post
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const currentDate = new Date(); // Get current date

  db.run(
    "INSERT INTO posts (title, content, date) VALUES (?, ?, ?)",
    [title, content, currentDate.toISOString()], // Store date as ISO string
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ postId: this.lastID });
    }
  );
});

// Get comments for a post
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.all("SELECT * FROM comments WHERE postId = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ comments: rows });
  });
});

// Add a comment to a post
router.post("/:id/comments", (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  db.run(
    "INSERT INTO comments (postId, content, date) VALUES (?, ?, ?)",
    [id, content, new Date()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ commentId: this.lastID });
    }
  );
});

export default router;
