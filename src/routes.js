import { Router } from 'express';
import multer from 'multer';
import BatchController from './app/controllers/BatchController';
import ExamController from './app/controllers/ExamController';
import FileController from './app/controllers/FileController';
import LaboratoryController from './app/controllers/LaboratoryController';
import LaboratoryExamController from './app/controllers/LaboratoryExamController';
import LoginController from './app/controllers/LoginController';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

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
routes.post('/files/', upload.single('file'), FileController.store);

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
routes.delete('/associations/', LaboratoryExamController.delete);

/**
 * Batch Files
 */
routes.post('/batch/exam/', upload.single('file'), BatchController.storeExam);
routes.put('/batch/exam/', upload.single('file'), BatchController.updateExam);
routes.delete(
  '/batch/exam/',
  upload.single('file'),
  BatchController.deleteExam
);

export default routes;
