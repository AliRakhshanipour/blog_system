import { sequelize } from '../configs/db.conf.js';
import setupAssociations from '../utils/associate-models.js';
import { userInit } from './user.model.js';

export const models = {
  UserModel: userInit(sequelize),
};

setupAssociations(models);

/**
 * Synchronizes the database with the current models.
 *
 * This function performs the following tasks:
 * 1. **Authenticate**: Checks the database connection.
 * 2. **Sync**: Syncs models with the database schema. The `alter: true` option updates the schema to match the model definitions.
 *
 * Logs success messages to the console after authentication and synchronization.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when synchronization is complete.
 * @throws {Error} If authentication or synchronization fails.
 */
export async function dbSynchronize() {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Sequelize authentication successful');

    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log('Sequelize synchronization successful');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
    throw error; // Re-throw the error to be handled by higher-level logic
  }
}
