import { Router } from 'express';
import LoginController from './app/controllers/LoginController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Funciona' }));

/**
 *  Login
 */
routes.post('/login/', LoginController.store);

/**
 *  User
 */
routes.post('/users/', UserController.store);

export default routes;
