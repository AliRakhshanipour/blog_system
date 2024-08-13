import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
config();

// PostgreSQL configuration
const { DATABASE_URL } = process.env;

// Validate environment variables
(() => {
  if (!DATABASE_URL) {
    throw new Error(
      'PostgreSQL configuration variables are not defined in environment variables.'
    );
  }
})();

// PostgreSQL setup with Sequelize
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to true if you want to log SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Export configurations and connection functions
export { sequelize };
