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
  })
  .catch((err) => {
    console.error('Connection error🟥:', err);
  });

// Globally handled unhandled rejection and uncaughtException
// process
//   .on('unhandledRejection', (reason: Error, promise) => {
//     console.error({ name: reason.name, message: reason.message });
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//     server.close((err) => {
//       process.exit(1);
//     });
//   })
//   .on('uncaughtException', (err) => {
//     console.error(err, 'Uncaught Exception thrown');
//     process.exit(1);
//   });
