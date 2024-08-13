import { Router } from 'express';
import { registerRoutes } from '../utils/route-handler.js';

const router = Router();

/**
 * Array of route configurations for class-related operations.
 *
 * @constant
 * @type {Array}
 * @property {string} method - HTTP method for the route (e.g., 'post', 'get', 'patch', 'delete').
 * @property {string} path - Path for the route (e.g., '/create', '/list', '/:id/update').
 * @property {Array<Function>} [middlewares] - Optional array of middleware functions to apply to the route.
 * @property {Array<Function>} handler - Array of handler functions for the route.
 */
const mainRoutes = [
  {
    method: 'get',
    path: '',
    middlewares: [],
    handler: [],
  }
];

/**
 * Registers class-related routes with the Express router.
 *
 * This function iterates over the `classRoutes` array and registers each route with the corresponding HTTP method and path.
 * The `registerRoutes` utility function is used to handle the registration process.
 */
registerRoutes(router, mainRoutes);

export default router;
