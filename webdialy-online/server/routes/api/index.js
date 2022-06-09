const { Router } = require('express');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = args => {
  const { publicPath, serviceApiPath, httpRequest } = args;
  const router = Router();

  router.use(json());
  router.use(urlencoded({ extended: false }));
  router.use(cookieParser());

  const serviceProvider = (req, res) => {
    const { method, baseUrl, path } = req;
    const completeUrl = `${serviceApiPath}${baseUrl.replace(
      new RegExp(`${publicPath}`),
      '',
    )}${path}`;
    const options = {
      url: completeUrl,
      method,
      headers: {
        ...req.headers,
      },
      path,
    };

    if (method !== 'GET') {
      options.body = req.body;
      options.json = true;
    }

    try {
      return httpRequest(options, (error, response, body) => {
        if (error || !body) {
          return res.status(500).json({ Error: error || response });
        }
        const { status, msg } = body;
        if (status === 'Register_Error') {
          return res.status(400).json({ Error: msg });
        }
        if (response && response.statusCode === 200) {
          return res.status(200).json(body);
        }

        return res.status(response.statusCode).json({ Error: response.statusMessage });
      });
    } catch (e) {
      return res.status(500).json({ Error: e });
    }
  };

  router.get('/*', serviceProvider);
  router.post('*', serviceProvider);
  router.put('*', serviceProvider);
  router.patch('*', serviceProvider);
  router.delete('*', serviceProvider);

  return router;
};
