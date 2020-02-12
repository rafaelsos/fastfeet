import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import StartOrderController from './app/controllers/StartOrderController';
import EndOrderController from './app/controllers/EndOrderController';
import ViewOrderController from './app/controllers/ViewOrdersController';
import DeliverysController from './app/controllers/DeliverysController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes start and end order
routes.put('/startorder/:id', StartOrderController.update);
routes.put('/endorder/:id', EndOrderController.update);

// View deliverer orders
routes.get('/deliveryman/:deliveryman_id', ViewOrderController.index);
routes.get('/deliveryman/:deliveryman_id/deliverys', DeliverysController.index);

// middleware auth
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// routes recipients com admin auth
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// routes deliveryman com admin auth
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// routes orders com admin auth
routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
