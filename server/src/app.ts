import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import recipesRouter from './routes/recipesRoutes';
import errorHandler from './controllers/errorController';
import AppError from './utils/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/v1/recipes', recipesRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(
    `This endpoint ${req.originalUrl} is not available!`,
    404,
  );
  // If you call `next()` with an argument, that argument is assumed to be an error.
  // it will skip all of the middleware in the middleware stack and send the error that we passed in to our global handling middleware
  next(error);
});

// Error handling middleware, only runs when there is an error
app.use(errorHandler);

export default app;
