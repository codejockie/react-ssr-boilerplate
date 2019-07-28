import fs from 'fs';
import path from 'path';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../client/src/components/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./client/assets'));

app.get('*', (req, res) => {
  const context = {};
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    // Handle redirects
    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.status === 404) {
      res.status(404);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.info(`\n🚀 Server is listening on port ${PORT} 🚀`);
});
