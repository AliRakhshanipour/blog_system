import { config } from 'dotenv';
import express from 'express';
import { setupSwagger } from './src/configs/openapi.conf.js';
import { ErrorHandlers } from './src/error/error.handlers.js';
import { middlewares } from './src/middlewares/index.middleware.js';
import { dbSynchronize } from './src/models/index.js';
import mainRoutes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
config();

const main = async () => {
  // Middleware setup
  app.use(...middlewares);

  setupSwagger(app);

  app.use('/', mainRoutes);

  await dbSynchronize();

  // Error handling middlewares
  app.use(...ErrorHandlers);

  // Your main application logic here
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Call the main function to start the application
main();
