const express = require('express');
const compression = require('compression');
const { resolve } = require('path');
require('dotenv').config();

const { publicPath, serviceApiPath } = require('../app/containers/App/constants');
const logger = require('./logger');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');

const app = express();
app.use(compression());

const httpRequest = require('./infra/httpRequest')();

const loggerApp = require('./infra/logger')({ logLevel: 'info', publicPath });

const jwtUseCases = require('./infra/jwt')({
  tokenAge: 3600,
  secret: 'softpos2013',
});
const passport = require('./infra/passport')({
  loggerApp,
  jwtUseCases,
});

const options = {
  serviceApiPath,
  publicPath,
  httpRequest,
  passport,
  jwtUseCases,
  loggerApp,
};

const basePathForAPI = publicPath.replace(/\/*$/, '');
app.use(`${basePathForAPI}/api/member/login`, require('./routes/login')(options));
app.use(`${basePathForAPI}/api/upload`, require('./routes/upload')(options));
app.use(`${basePathForAPI}/api`, require('./routes/api')(options));

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: `${basePathForAPI}/`,
});

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, async err => {
  if (err) {
    return logger.error(err.message);
  }

  return logger.appStarted(port, 'localhost');
});
