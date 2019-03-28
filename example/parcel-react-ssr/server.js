import express from 'express';
import path from 'path';
import portfinder from 'portfinder';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import App from './src/App';

const app = express();

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/*', (req, res) => {
  const jsx = (<App/>);
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(reactDom, helmetData));
});


portfinder.getPort((err, port) => {
  app.listen(port);
  console.log(`Running on port ${port}`);
});


function htmlTemplate(reactDom, helmetData) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
        </body>
        </html>
    `;
}
