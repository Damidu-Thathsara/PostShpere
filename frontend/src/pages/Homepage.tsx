import React from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import { Container, Box, Typography, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          PostSphere
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Community Board
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Share your thoughts, ideas, and stories with others. Join the
          conversation!
        </Typography>
        <CreatePost />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Recent Posts
        </Typography>
        <PostList />
      </Box>
    </Container>
  );
};

export default HomePage;
