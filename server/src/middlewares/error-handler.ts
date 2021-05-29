/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  console.error(err.stack);
  // eslint-disable-next-line no-param-reassign
  if (!err.status) err.status = 400;
  return res.status(err.status).json({ message: err.message });
};

// eslint-disable-next-line import/prefer-default-export
export { errorHandler };
