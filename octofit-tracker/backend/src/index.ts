import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { apiBaseUrl, frontendBaseUrl } from './config/apiUrl';
import db from './config/database';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(
  cors({
    origin: [frontendBaseUrl, 'http://localhost:5173'],
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api', apiRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`Octofit backend listening at ${apiBaseUrl}`);
});

export { app, db };
