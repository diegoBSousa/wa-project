import { Router } from 'express';
import multer from 'multer';
import ExamController from './app/controllers/ExamController';
import FileController from './app/controllers/FileController';
import LaboratoryController from './app/controllers/LaboratoryController';
import LaboratoryExamController from './app/controllers/LaboratoryExamController';
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

/**
 * Exams
 */
routes.post('/exams/', ExamController.store);
routes.put('/exams/:uuid/', ExamController.update);
routes.delete('/exams/:uuid/', ExamController.delete);
routes.get('/exams/', ExamController.index);

/**
 * Association
 */
routes.post('/associations/', LaboratoryExamController.store);

export default routes;
