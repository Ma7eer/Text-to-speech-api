import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
require('dotenv').config(); // configure env variables

/**
 * routes.
 */
import router from './api/v1/router';

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.use(logger('dev'));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// gzip compression
app.use(compression());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// secure servers by setting various HTTP headers
app.use(helmet());

// v1 routes
app.use('/v1', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
