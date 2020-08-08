import express from 'express';
import ClassesController from './controllers/ClassesController';


const routes = express.Router();
const ClassesControllers = new ClassesController();

//GET
routes.get('/classes', ClassesControllers.index);

routes.post('/classes', ClassesControllers.create);



 export default routes;