import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';

import Routes from '../client/routes';
import renderer from '../client/helpers/renderer';
import createStore from '../client/helpers/createStore';

const PORT = process.env.PORT || 3006;
const app = express();

app.use('/api', proxy('https://5e97ebe877f5430016339c43.mockapi.io', {
  proxyReqOptDecorator(options) {
    options.headers['x-forwarded-host'] = `localhost:${PORT}`;
    return options;
  }
}));
app.use(express.static('src/client/assets'));

app.get('*', (req, res) => {
  const store = createStore(req);
  const promises = matchRoutes(Routes, req.url)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer({ req }, store, context);

    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(PORT, () => {
  console.info(`\n🚀 Server is listening on port ${PORT} 🚀`);
});
