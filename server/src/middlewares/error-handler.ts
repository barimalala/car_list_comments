/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';

class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const errorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);
  if (!err.status) err.status = 400;
  return res.status(err.status).json({ message: err.message });
};

export { errorHandler };
