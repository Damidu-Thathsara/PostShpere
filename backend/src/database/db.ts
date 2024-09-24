import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./socialmedia.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, content TEXT, date TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, postId INTEGER, content TEXT, date TEXT)"
  );
});

export default db;
