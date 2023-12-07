import { NextFunction, Request, Response } from 'express';

type handlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

// To catch error in async functions
const catchAsync = (fn: handlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
