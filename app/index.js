import { config } from 'dotenv';
import express from 'express';
import mainRoutes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
config();

const main = () => {

    app.use('/',mainRoutes)
    // Your main application logic here
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// Call the main function to start the application
main();
