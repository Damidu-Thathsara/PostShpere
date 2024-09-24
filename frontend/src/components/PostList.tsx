import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Grid,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const StyledModal = styled(Box)({
  padding: 20,
  borderRadius: 8,
  backgroundColor: "#f9f9f9",
  margin: "auto",
  marginTop: "10%",
  maxWidth: 600,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface Comment {
  content: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setPosts(response.data.posts);
    });
  }, []);

  const fetchComments = (postId: number) => {
    axios
      .get(`http://localhost:5000/posts/${postId}/comments`)
      .then((response) => {
        setComments((prev) => ({ ...prev, [postId]: response.data.comments }));
      });
  };

  const handleAddComment = (postId: number) => {
    axios
      .post(`http://localhost:5000/posts/${postId}/comments`, {
        content: newComment[postId],
      })
      .then(() => {
        fetchComments(postId);
        setNewComment((prev) => ({ ...prev, [postId]: "" }));
      });
  };

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <StyledCard
                onClick={() => handleOpenModal(post)}
                sx={{ cursor: "pointer", height: "100%" }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.content}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" color="textSecondary">
                No posts available
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Modal for post details */}
      <Modal open={open} onClose={handleCloseModal}>
        <StyledModal>
          {selectedPost && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedPost.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedPost.content}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Comments:
              </Typography>
              {comments[selectedPost.id]?.map((comment, index) => (
                <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                  {comment.content}
                </Typography>
              ))}
              <TextField
                label="Add a Comment"
                value={newComment[selectedPost.id] || ""}
                onChange={(e) =>
                  setNewComment((prev) => ({
                    ...prev,
                    [selectedPost.id]: e.target.value,
                  }))
                }
                fullWidth
                sx={{ marginTop: 2 }}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (selectedPost) {
                    handleAddComment(selectedPost.id);
                  }
                }}
                sx={{ marginTop: 2 }}
              >
                Submit Comment
              </Button>
            </>
          )}
        </StyledModal>
      </Modal>
    </Container>
  );
};

export default PostList;
