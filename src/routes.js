import { Router } from 'express';
import multer from 'multer';
import FileController from './app/controllers/FileController';
import LaboratoryController from './app/controllers/LaboratoryController';
import LoginController from './app/controllers/LoginController';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';

const routes = new Router();
const updload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: 'Funciona' }));

/**
 *  Login
 */
routes.post('/login/', LoginController.store);

/**
 *  User
 */
routes.post('/users/', UserController.store);
routes.get('/users/', UserController.index);

/**
 *  Laboratory
 */
routes.post('/laboratory/', LaboratoryController.store);
routes.put('/laboratory/:uuid/', LaboratoryController.update);
routes.delete('/laboratory/:uuid/', LaboratoryController.delete);
routes.get('/laboratory/', LaboratoryController.index);

/**
 * Files
 */
routes.post('/files/', updload.single('file'), FileController.store);

export default routes;
