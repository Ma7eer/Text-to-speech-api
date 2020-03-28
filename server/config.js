import dotenv from 'dotenv';
let result = dotenv.config(); // configure env variables

if (result.error) {
  console.log(result.parsed);
  throw result.error;
}

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  portHttps: process.env.PORT_HTTPS,
  mongoUrl: process.env.MONGODB_URL,
  whitelist: ['http://localhost:3000'], // change as per requirements
  ssl: {
    privateKey: '',
    certificate: '',
    ca: ''
  },
  host: '' // Heroku provides an ssl cert off the box so no need for configuration
};
