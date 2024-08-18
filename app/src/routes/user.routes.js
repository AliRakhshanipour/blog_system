import { Router } from 'express';
import { UserHandler } from '../handlers/user/user.handler.js';
import {
  validateUserCreation,
  validateUserId,
  validateUserUpdate,
} from '../handlers/user/user.validation.js';
import { AuthorizeMiddleware } from '../middlewares/auth/auth.middlewares.js';
import { registerRoutes } from '../utils/route-handler.js';

const router = Router();

const { isAuthenticated, ensureRoles, ensureRolesOrSuperuser } =
  AuthorizeMiddleware;

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
    middlewares: [isAuthenticated, ensureRoles('مدیر'), validateUserCreation],
    handler: [UserHandler.createUser],
  },

  {
    method: 'get',
    path: '/list',
    middlewares: [isAuthenticated, ensureRoles('مدیر')],
    handler: [UserHandler.listUsers],
  },
  {
    method: 'get',
    path: '/:id',
    middlewares: [isAuthenticated, ensureRoles('مدیر'), validateUserId],
    handler: [UserHandler.getUser],
  },
  {
    method: 'patch',
    path: '/update/:id',
    middlewares: [
      isAuthenticated,
      ensureRoles('مدیر'),
      validateUserId,
      validateUserUpdate,
    ],
    handler: [UserHandler.updateUser],
  },
  {
    method: 'delete',
    path: '/delete/:id',
    middlewares: [isAuthenticated, ensureRoles('مدیر'), validateUserId],
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
