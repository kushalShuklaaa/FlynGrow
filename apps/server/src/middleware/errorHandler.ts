import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@studyhub/types';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'MongoError' && error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }

  const response: ApiResponse = {
    success: false,
    message,
    error: config.NODE_ENV === 'development' ? error.stack : undefined
  };

  res.status(statusCode).json(response);
};

export const notFound = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`
  };
  res.status(404).json(response);
};