import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CouriersController from './app/controllers/CouriersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

// routes recipients com admin auth
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// routes couriers com admin auth
routes.get('/couriers', CouriersController.index);
routes.post('/couriers', CouriersController.store);
routes.put('/couriers/:id', CouriersController.update);
routes.delete('/couriers/:id', CouriersController.delete);

export default routes;
