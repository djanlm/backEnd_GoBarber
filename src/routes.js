/* eslint-disable linebreak-style */
// import only Router from express
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // only what is after this line gonna use this middleware

routes.put('/users', UserController.update); // Não autorizar o uso dessa rota pra users desconectados

export default routes;
