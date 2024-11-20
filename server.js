import express from 'express';
import dotenv from 'dotenv';
import articlesRouter from './routes/articlesRoutes.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middleware/errorHandler.js';
import connectDb from './config/dbConnection.js';

dotenv.config();

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
