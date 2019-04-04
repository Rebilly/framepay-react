const express = require('express');
const path = require('path');
const fs = require('fs');
const portfinder = require('portfinder');

const app = express();

const staticFiles = path.resolve(__dirname, '../../dist');

app.use(express.static(staticFiles));

fs.readdirSync(path.join(__dirname, './fixtures'))
    .filter(name => name.includes('.html'))
    .forEach(name => {
        const url = name.replace('.html', '');
        app.use(`/${url}`, express.static(path.resolve(staticFiles, name)));
    });

module.exports = function() {
    return new Promise((resolve) => {
        portfinder.getPort((err, port) => {
            const server = app.listen(port);
            console.log(`Running on port ${port}`);
            resolve({ port, server });
        });
    });
};
