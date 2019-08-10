import React from 'react';
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from '../components/App';

export default ({ context, data, req }, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>React SSR App</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="bundle.js"></script>
    <script>window.__ROUTE_DATA__ = ${serialize(data)}</script>
  </body>
  </html>
  `;
};