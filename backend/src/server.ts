import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
