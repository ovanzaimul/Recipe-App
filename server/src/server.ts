import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
);

mongoose
  .connect(DB, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('Database connected');

    app.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  });
