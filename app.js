import express from 'express';
import 'express-async-errors'; // import immediately after express to patch express
import dotenv from 'dotenv';
import cors from 'cors';
import xss from 'xss-clean';
// import modules
import alertRouter from './routes/alert.js';
import notFoundMiddleware from './middleware/not-found.js';

// initialize dotenv
dotenv.config();

// initialize express
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/alert', alertRouter);

// 404 and error handler middleware to catch request errors from routes
app.use(notFoundMiddleware);

// start server function
const start = async () => {
  try {
    app.listen(port, () => console.log(`Server listening on port [${port}]`));
  } catch (err) {
    console.error(err);
  }
};

start();
