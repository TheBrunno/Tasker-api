import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import taskRoutes from './src/routes/taskRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

import './src/database/connection';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/acc', userRoutes);
    this.app.use('/task', taskRoutes);
    this.app.use('/token', tokenRoutes);
  }
}

export default new App().app;
