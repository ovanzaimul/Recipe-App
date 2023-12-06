import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import recipesRouter from './routes/recipesRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/recipes', recipesRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `This endpoint ${req.originalUrl} is not available!`,
  });
});

export default app;
