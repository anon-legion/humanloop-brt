import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { InvalidPayloadError } from '../errors/index.js';

const invalidValueHandler = (req, res, next) => {
  const result = validationResult(req).array();
  // validation error guard clause
  if (result.length) throw new InvalidPayloadError('Invalid payload', result);

  // if no validation errors, proceed to controller or next middleware
  next();
};

export default invalidValueHandler;
