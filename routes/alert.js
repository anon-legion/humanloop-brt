import express from 'express';
import getAlertGPT4 from '../controllers/alert.js';

const router = express.Router();

router.route('/')
  .post(getAlertGPT4);

export default router;