import express from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import getAlertGPT4 from '../controllers/alert.js';

const router = express.Router();
// prettier-ignore
router.route('/')
  .post(
    // validate and sanitize payload from request body
    body(['grossSales', 'txnCount', 'timeIn']).isString().trim().notEmpty().escape(),
    body(['grossSales', 'txnCount']).isNumeric(),
    body('timeIn').isTime({ hourFormat: 'hour24'}),
    // body('grossSales').isCurrency(),
    // handle validation errors
    (req, res, next) => {
      const result = validationResult(req).array();
      // validation error guard clause
      if (result.length) return res.status(StatusCodes.BAD_REQUEST).json({ message: result });
      // if no validation errors, proceed to controller
      next();
    },
    // controller
    getAlertGPT4
  );

export default router;
