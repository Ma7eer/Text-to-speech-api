#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
debug('ma7eer-nodejs-api-boilerplate:server');
import http from 'http';
import https from 'https';
import { config } from '../config';
import fs from 'fs';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || '3001');
app.set('port', port);

// Certificate
let privateKey = null;
let certificate = null;
let ca = null;

// Heroku provides an ssl cert off the box so no need for configuration
if (config.env === 'production' && config.host !== 'Heroku') {
  privateKey = fs.readFileSync(config.ssl.privateKey, 'utf8');
  certificate = fs.readFileSync(config.ssl.certificate, 'utf8');
  ca = fs.readFileSync(config.ssl.ca, 'utf8');
}

/*
credintials
*/
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

// Heroku provides an ssl cert off the box so no need for configuration
if (config.env === 'production' && config.host !== 'Heroku') {
  /**
   * Create HTTPS server.
   */
  const httpsServer = https.createServer(credentials, app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  httpsServer.listen(config.portHttps, () => {
    console.log('HTTPS Server running on port 443');
  });
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () =>
  console.info(`Server started on port ${port} (${config.env})`)
);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
