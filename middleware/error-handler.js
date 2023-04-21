import { StatusCodes } from 'http-status-codes';
import { InvalidPayloadError } from '../errors/index.js';

// if customAPIError is thrown, it will assign the statusCode and message to the customError object
// and will be caught by this error handler middleware
const errorHandlerMiddleware = (err, req, res, next) => {
  // set default
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later',
  };

  // error object to be sent as error response to client
  let errorObj = {
    message: customError.message,
  };

  // if error is thrown by express-validator append validationErrors to errorObj
  if (err instanceof InvalidPayloadError) errorObj.errors = err.validationErrors;
  // if (err.message === 'Invalid payload') errorObj.errors = err.validationErrors;

  // return res.status(customError.statusCode).json({ err }); // uncomment return to refer to err object structure
  return res.status(customError.statusCode).json(errorObj);
};

export default errorHandlerMiddleware;
