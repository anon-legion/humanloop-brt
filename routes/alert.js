import express from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import getAlertGPT4 from '../controllers/alert.js';
import invalidValueHandler from '../middleware/invalid-value-handler.js';

const router = express.Router();
// prettier-ignore
router.route('/')
  .post(
    // validate and sanitize payload from request body
    body(['grossSales', 'txnCount', 'timeIn'], 'string value expected').isString().trim().notEmpty().escape(),
    body(['grossSales', 'txnCount'], 'string input must represent a numeric value').isNumeric(),
    body('timeIn', 'invalid time, format must be 24hour based hh:mm').isTime({ hourFormat: 'hour24'}),
    // body('grossSales').isCurrency(),
    // handle validation errors
    invalidValueHandler,
    // controller
    getAlertGPT4
  );

export default router;
