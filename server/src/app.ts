import express from 'express';
import cors from 'cors';

import recipesRouter from './routes/recipesRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.use('/api/v1/recipes', recipesRouter);

export default app;
