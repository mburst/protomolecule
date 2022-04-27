import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import { HttpException } from '../errors/httpException';

export const SNACKBAR_CODE = 0;

// Express requires all 4 params to recognize this as error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: HttpException, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
      code: SNACKBAR_CODE,
    });
    return;
  }

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({
    message,
    code: err.code,
  });
};
