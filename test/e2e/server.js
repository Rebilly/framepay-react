const express = require('express');
const path = require('path');
const fs = require('fs');
const portfinder = require('portfinder');

const app = express();

const staticFiles = path.resolve(__dirname, '../../build/e2e');

app.use(express.static(staticFiles));

const addDirRoutes = (dir, category) => {
    fs.readdirSync(dir)
        .filter(name => !!name.includes('.html'))
        .forEach((name) => {
            const basename = path.basename(name, path.extname(name));
            const url = category ? `/${category}/${basename}` : `/${basename}`;
            app.use(url, express.static(path.resolve(dir, name)));
        });
};

addDirRoutes(path.resolve(__dirname, '../../build/e2e'), '');

module.exports = function() {
    return new Promise((resolve) => {
        portfinder.getPort((err, port) => {
            const server = app.listen(port);
            console.log(`Running on port ${port}`);
            resolve({ port, server, app });
        });
    });
};
