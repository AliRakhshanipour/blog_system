import { Router } from 'express';
import { UserHandler } from '../handlers/user/user.handler.js';
import {
  validateUserCreation,
  validateUserId,
  validateUserUpdate,
} from '../handlers/user/user.validation.js';
import { registerRoutes } from '../utils/route-handler.js';

const router = Router();

/**
 * Array of route configurations for class-related operations.
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * @constant
 * @type {Array}
 * @property {string} method - HTTP method for the route (e.g., 'post', 'get', 'patch', 'delete').
 * @property {string} path - Path for the route (e.g., '/create', '/list', '/:id/update').
 * @property {Array<Function>} [middlewares] - Optional array of middleware functions to apply to the route.
 * @property {Array<Function>} handler - Array of handler functions for the route.
 */
const userRoutes = [
  {
    method: 'post',
    path: '/create-user',
    middlewares: [validateUserCreation],
    handler: [UserHandler.createUser],
  },

  {
    method: 'get',
    path: '/list',
    middlewares: [],
    handler: [UserHandler.listUsers],
  },
  {
    method: 'get',
    path: '/:id',
    middlewares: [validateUserId],
    handler: [UserHandler.getUser],
  },
  {
    method: 'patch',
    path: '/update/:id',
    middlewares: [validateUserId, validateUserUpdate],
    handler: [UserHandler.updateUser],
  },
  {
    method: 'delete',
    path: '/delete/:id',
    middlewares: [validateUserId],
    handler: [UserHandler.deleteUser],
  },
];

/**
 * Registers class-related routes with the Express router.
 *
 * This function iterates over the `classRoutes` array and registers each route with the corresponding HTTP method and path.
 * The `registerRoutes` utility function is used to handle the registration process.
 */
registerRoutes(router, userRoutes);

export default router;
