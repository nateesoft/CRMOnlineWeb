const { Router } = require('express');
const { json, urlencoded } = require('body-parser');

module.exports = args => {
  const { publicPath, serviceApiPath, httpRequest } = args;
  const router = Router();

  router.use(json());
  router.use(urlencoded({ extended: false }));

  const serviceProvider = (req, res) => {
    const { method, baseUrl, path } = req;
    const completeUrl = `${serviceApiPath}${baseUrl.replace(
      new RegExp(`${publicPath}`),
      '',
    )}${path}`;
    const options = {
      ...req.headers,
      url: completeUrl,
      method,
      path,
    };
    if (method !== 'GET') {
      options.body = req.body;
      options.json = true;
    }

    try {
      return httpRequest(options, (error, response, body) => res.status(200).json(body));
    } catch (e) {
      return res.status(500).json({ Error: e });
    }
  };

  router.post('*', serviceProvider);

  return router;
};
