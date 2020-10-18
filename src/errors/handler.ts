import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (e, req, res, next) => {
  if (e instanceof ValidationError) {
    let errors: ValidationErrors = {};

    e.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return res.status(400).json({ message: 'Validation fails', errors })
  }

  console.error(e);

  return res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;