import React from 'react';
import fs from 'fs';
import path from 'path';
import portfinder from 'portfinder';
import { renderToNodeStream } from 'react-dom/server';
import express from 'express';

import App from './src/App';

const app = express();

const splitVal = '<div id="app">';
const htmlFragments = fs
    .readFileSync(`${__dirname}/src/index.html`)
    .toString('utf8')
    .split(splitVal);

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    const stream = renderToNodeStream(<App/>);

    res.write(htmlFragments[0]);
    res.write(splitVal);

    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write(htmlFragments[1]);
        res.end();
    });
});

portfinder.getPort((err, port) => {
    app.listen(port);
    console.log(`Running on port ${port}`);
});
