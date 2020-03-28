import mongoose from 'mongoose';

import { config } from './config';

// Exit application on error
mongoose.connection.on('error', err => {
  // eslint-disable-next-line no-console
  console.error(`MongoDB connection error: ${err}`);
  // eslint-disable-next-line no-process-exit
  process.exit(-1);
});

// print mongoose logs in dev env
if (config.env === 'development') {
  mongoose.set('debug', false);
}

// log message when connected to db
mongoose.connection.once('open', function () {
  // we're connected!
  console.info('successfully connected to db');
});

/**
 * Connect to mongo db
 */
export default {
  connect: () => {
    mongoose.connect(config.mongoUrl, {
      keepAlive: 1,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return mongoose.connection;
  }
};
