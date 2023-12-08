import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

const handleDuplicateKey = (err: AppError) => {
  return new AppError(err.message, 400);
};

const handleValidationErro = (err: AppError) => {
  // should be simpler error message
  return new AppError(err.message, 400);
};

const handleCastError = (err: AppError) => {
  const message = `Invalid ${err.path}(${err.kind}): ${err.value}`;
  return new AppError(message, 400);
};

const responseErrorDev = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const responseErrorProd = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  if (process.env.NODE_ENV === 'development') responseErrorDev(res, err);
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.code === 11000) error = handleDuplicateKey(err);
    if (err.name === 'ValidationError') error = handleValidationErro(err);
    if (err.name === 'CastError') error = handleCastError(err);

    responseErrorProd(res, error);
  }
};

export default errorHandler;
