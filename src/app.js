/* eslint-disable linebreak-style */
// A configuração do servidor express é aqui
// it is possible to import using this sintax because I installed the sucrase extension
import express from 'express';
import routes from './routes';
import './database'; // já pega o index.js automaticamente

/* eslint linebreak-style: ["error", "windows"] */
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    // instead of putting our routes here, we import them from the other file
    this.server.use(routes);
  }
}

export default new App().server;
