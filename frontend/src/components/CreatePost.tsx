import React, { useState } from "react";
import { Modal, Button, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledModal = styled(Box)({
  padding: 20,
  borderRadius: 8,
  backgroundColor: "#f9f9f9",
  margin: "auto",
  marginTop: "10%",
  maxWidth: 400,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

const CreatePost: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        <StyledModal>
          <Typography variant="h5" gutterBottom align="center">
            Create a New Post
          </Typography>
          <TextField
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!error && error.includes("title")}
            helperText={error && error.includes("title") ? error : ""}
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
            size="small"
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
            sx={{ marginBottom: 2 }}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </StyledModal>
      </Modal>
    </div>
  );
};

export default CreatePost;
