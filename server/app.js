import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import database from './database';
/**
 * routes.
 */
import router from './api/v1/router';
import { config } from './config';

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
if (config.env === 'development') {
  app.use(cors());
} else {
  const corsOptions = {
    origin: function (origin, callback) {
      if (config.whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
}

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

// connect to database
database.connect();

export default app;
