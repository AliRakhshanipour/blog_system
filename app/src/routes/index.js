import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

/**
 * Main routes for the application.
 *
 * This module combines routes from different route files and attaches them to the main router.
 *
 * @module mainroutes
 */

/**
 * Array of route objects to be registered.
 * Each object contains a path and a router.
 *
 * @const {Array<{path: string, router: Router}>}
 */
const mainRoutes = [
  { path: '/users', router: userRoutes },
  { path: '/auth', router: authRoutes },
];

/**
 * Register each route with the main router.
 */
mainRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
