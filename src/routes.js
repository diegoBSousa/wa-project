import { Router } from 'express';
import LaboratoryController from './app/controllers/LaboratoryController';
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
routes.get('/users', UserController.index);

/**
 *  Laboratory
 */
routes.post('/laboratory', LaboratoryController.store);

export default routes;
