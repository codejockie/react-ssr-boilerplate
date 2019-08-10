import express from 'express';
import { matchPath } from 'react-router-dom';

import Routes from '../client/routes';
import renderer from '../client/helpers/renderer';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('src/client/assets'));

app.get('*', (req, res) => {
  const currentRoute = Routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    // Add the data to the context
    const context = { data };

    if (context.status === 404) {
      res.status(404);
    }

    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.send(renderer({ context, data, req }));
  });
});

app.listen(PORT, () => {
  console.info(`\n🚀 Server is listening on port ${PORT} 🚀`);
});
