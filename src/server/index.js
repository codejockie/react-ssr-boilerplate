import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import { matchPath } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import Routes from '../client/routes';
import renderer from '../client/helpers/renderer';
import createStore from '../client/helpers/createStore';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('src/client/assets'));

app.get('*', (req, res) => {
  const store = createStore();
  const promises = matchRoutes(Routes, req.url).map(({ route }) => (route.loadData ? route.loadData(store) : null));
  
  Promise.all(promises).then(() => {
    res.send(renderer({ req }, store));
  });
});

app.listen(PORT, () => {
  console.info(`\n🚀 Server is listening on port ${PORT} 🚀`);
});
