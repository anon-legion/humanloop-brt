import { StatusCodes } from 'http-status-codes';
import customApiError from './custom-api.js';

class InvalidPayloadError extends customApiError {
  constructor(message, validationErrors) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.validationErrors = validationErrors;
  }
}

export default InvalidPayloadError;
