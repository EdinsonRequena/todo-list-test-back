import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRoutes } from './features/auth/routes/routes';
import { taskRoutes } from './features/tasks/routes/routes';
import { errorHandler } from './middlewares/error.middleware';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') || '*' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);

  app.use(errorHandler);
  return app;
}
