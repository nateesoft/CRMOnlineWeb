/* eslint consistent-return:0 import/order:0 */

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

const httpRequest = require('./infra/httpRequest/usecases')();
const envConfig = require('../config/envConfig');

const appBasePath = envConfig('APP_BASE_PATH');
const appName = envConfig('APP_NAME');
let serviceApiHost = envConfig('SERVICE_API_HOST');
const isDemo = process.env.NODE_ENV === 'demo';
if (isDemo) {
  serviceApiHost = envConfig('SERVICE_API_HOST_DEMO');
}

const options = {
  serviceApiHost,
  appBasePath,
  appName,
  httpRequest,
};

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
const basePathForAPI = appBasePath.replace(/\/*$/, '');
app.use(`${basePathForAPI}/api/verifyUser`, require('./routes/verifyUser')(options));
app.use(`${basePathForAPI}/api/member/login`, require('./routes/login')(options));
app.use(`${basePathForAPI}/api`, require('./routes/api')(options));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: `${appBasePath}`,
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
