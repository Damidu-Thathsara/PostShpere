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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.all("SELECT * FROM posts WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ post: rows });
  });
});

// Create a post
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const currentDate = new Date(); // Get current date

  if (title == null || content == null) {
    return res.status(400).json({ error: "Title or content is missing" });
  }

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

router.delete("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ postId: id });
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
