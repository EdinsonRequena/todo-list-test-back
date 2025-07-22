import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
  });
}
