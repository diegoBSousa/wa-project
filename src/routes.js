import { Router } from 'express';
import multer from 'multer';
import AuthorizationMiddleware from './app/middlewares/authorization';
import ValidationMiddleware from './app/middlewares/validation';
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
routes.post('/user/', UserController.store);
routes.get('/user/', UserController.index);

routes.use(AuthorizationMiddleware);

/**
 *  Laboratory
 */
routes.post('/laboratory/', LaboratoryController.store);
routes.put(
  '/laboratory/:uuid/',
  ValidationMiddleware,
  LaboratoryController.update
);
routes.delete(
  '/laboratory/:uuid/',
  ValidationMiddleware,
  LaboratoryController.delete
);
routes.get('/laboratory/', LaboratoryController.index);

/**
 * Files
 */
routes.post('/files/', upload.single('file'), FileController.store);

/**
 * Exams
 */
routes.post('/exam/', ExamController.store);
routes.put('/exam/:uuid/', ValidationMiddleware, ExamController.update);
routes.delete('/exam/:uuid/', ValidationMiddleware, ExamController.delete);
routes.get('/exam/', ExamController.index);

/**
 * Association
 */
routes.post('/association/', LaboratoryExamController.store);
routes.delete('/association/', LaboratoryExamController.delete);

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

routes.post(
  '/batch/laboratory/',
  upload.single('file'),
  BatchController.storeLaboratory
);
routes.put(
  '/batch/laboratory/',
  upload.single('file'),
  BatchController.updateLaboratory
);
routes.delete(
  '/batch/laboratory/',
  upload.single('file'),
  BatchController.deleteLaboratory
);

export default routes;
