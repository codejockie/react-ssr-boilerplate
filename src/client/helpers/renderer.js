import React from 'react';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';

import Routes from '../routes';

export default ({ data, req }, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
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
    <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
    <script src="bundle.js"></script>
  </body>
  </html>
  `;
};