import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import articlesRouter from './routes/articlesRoutes.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

import connectDb from './config/dbConnection.js';

dotenv.config();

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/posts', articlesRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
