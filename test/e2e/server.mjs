import express from 'express';
import path from 'path';
import fs from 'fs';
import portfinder from 'portfinder';
import AutoEncryptLocalhost from '@small-tech/auto-encrypt-localhost';
import HttpServer from '@small-tech/auto-encrypt-localhost/lib/HttpServer.js';
import { fileURLToPath } from 'url';

// __dirname is not available in esmodules, so we must build it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const staticFiles = path.resolve(__dirname, './build');

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

addDirRoutes(path.resolve(__dirname, './build'), '');

export default function() {
    return new Promise((resolve) => {
        portfinder.getPort((err, port) => {
            // Do not create a http redirect server
            HttpServer.instance = true;

            const server = AutoEncryptLocalhost.https.createServer(app);
            server.listen(port);
            console.log(`Running at https://localhost:${port}`);
            resolve({ port, server, app });
        });
    });
};
