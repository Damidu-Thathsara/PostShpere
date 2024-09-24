import React, { useState } from "react";
import { Modal, Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";

const CreatePost: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = () => {
    // Validate title and content before sending the request
    if (!title.trim()) {
      setError("Post title cannot be empty.");
      return;
    }
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    // Clear previous error
    setError(null);

    axios
      .post("http://localhost:5000/posts", { title, content })
      .then(() => {
        setOpen(false);
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        setError("Failed to create post. Please try again.");
        console.error(err);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Post
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            padding: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            margin: "auto",
            marginTop: "10%",
            maxWidth: 400,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create a New Post
          </Typography>
          <TextField
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!error && error.includes("title")}
            helperText={error && error.includes("title") ? error : ""}
            fullWidth
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "red",
                },
              "& .MuiFormHelperText-root.Mui-error": {
                color: "red",
              },
            }}
          />
          <TextField
            label="Post Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!error && error.includes("content")}
            helperText={error && error.includes("content") ? error : ""}
            fullWidth
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "red",
                },
              "& .MuiFormHelperText-root.Mui-error": {
                color: "red",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePost;
