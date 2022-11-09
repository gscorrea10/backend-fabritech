import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './shared/routes';
import cors from 'cors';
import './shared/container/index';
import 'dotenv/config';
import { AppError } from './shared/errors/AppError';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });

  next();
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server up on port', process.env.PORT || 3333);
});
