import dotenv from 'dotenv';
let result = dotenv.config(); // configure env variables

if (result.error) {
  console.log(result.parsed);
  throw result.error;
}

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  whitelist: ['http://localhost:3000'] // change as per requirements
};
