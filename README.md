# Ma7eer-nodejs-api-boilerplate

My personal boilerplate for starting a node js api using Express and MongoDB.

This project was put together and inspired by:

- [Express generator](https://expressjs.com/en/starter/generator.html) - main template skeleton
- [Testing Javascript with Kent C. Dodds](https://testingjavascript.com/) - eslint, prettier, and testing config
- [express-boilerplate by imbudhiraja](https://github.com/imbudhiraja/express-boilerplate) - folder structure
- My own experience and personal preference

### Includes

- [x] Linting with eslint
- [x] Logging with morgan
- [x] ES6+ transpile with babel
- [x] Mongoose & MongoDB
- [x] SSL certification setup
- [x] Full CPU usage configured for production
- [x] Uses helmet to set some HTTP headers for security
- [x] Load environment variables from .env files with dotenv
- [x] Gzip compression with compression
- [x] Git hooks with husky
- [x] Documentation
- [ ] Testing (Future)

## Getting Started

These instruction will get this boilerplate running on your local machine

1 - Clone the project into a local repository:

```
git clone https://github.com/Ma7eer/Ma7eer-nodejs-api-boilerplate.git
```

2 - Install all dependencies

```
npm install
```

3 - Setup environment variables

To setup environment variables create a `.env` file in the root directory of the project.

Check the `./server/config.js` file for the main variables to be configured.

At the moment they are:

- NODE_ENV
- PORT
- MONGODB_URL

Note these are the minimum variables necessary to start the server. Check `./server/config.js` for additional one.

4 - Run development environment

```
npm run dev
```

To run the server with automatic restart

```
npm run watch:dev
```

5- Run production environment

```
npm start
```

When you run this command babel will transpile the code into `dist-server` folder.

## Documentation

This api can be documented with potman documentation.

An example of that can be seen in the following link:

https://documenter.getpostman.com/view/2897708/SzYZ2JxH?version=latest
