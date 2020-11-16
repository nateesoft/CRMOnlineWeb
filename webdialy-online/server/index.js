const express = require('express');
const logger = require('./logger');
const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

const httpRequest = require('./infra/httpRequest')();
const envConfig = require('../config/envConfig');

const appBasePath = process.env.REACT_APP_PUBLIC_PATH || envConfig('APP_BASE_PATH');
const appName = process.env.REACT_APP_NAME || envConfig('APP_NAME');
let serviceApiHost = envConfig('SERVICE_API_HOST');
const isDemo = process.env.NODE_ENV === 'demo';
if (isDemo) {
  serviceApiHost = envConfig('SERVICE_API_HOST_DEMO');
}

const loggerApp = require('./infra/logger')({
  appName,
  logLevel: 'info',
})

const jwtUseCases = require('./infra/jwt')({
  tokenAge: 3600,
  secret: 'softpos2013'
})
const passport = require('./infra/passport')({
  loggerApp,
  jwtUseCases,
})

const options = {
  serviceApiHost,
  appBasePath,
  appName,
  httpRequest,
  passport,
  jwtUseCases,
  loggerApp,
};

const basePathForAPI = appBasePath.replace(/\/*$/, '');
app.use(`${basePathForAPI}/api/verifyUser`, require('./routes/verifyUser')(options));
app.use(`${basePathForAPI}/api/member/login`, require('./routes/login')(options));
app.use(`${basePathForAPI}/api/upload`, require('./routes/upload')(options));
app.use(`${basePathForAPI}/api`, require('./routes/api')(options));

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: `${basePathForAPI}/`,
});

const customHost = argv.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const customPort = envConfig('PORT') || port;

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(customPort, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(customPort);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(customPort, prettyHost, url);
  } else {
    logger.appStarted(customPort, prettyHost);
  }
});
