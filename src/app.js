/* eslint-disable linebreak-style */
// A configuração do servidor express é aqui
// it is possible to import using this sintax because I installed the sucrase extension
import 'dotenv/config'; // process.env

import express from 'express';
import path from 'path';
import 'express-async-errors';
import Youch from 'youch';

import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import routes from './routes';
import './database'; // já pega o index.js automaticamente

/* eslint linebreak-style: ["error", "windows"] */
class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // instead of putting our routes here, we import them from the other file
    this.server.use(routes);
    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
