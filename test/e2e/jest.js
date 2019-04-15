require('../../env');
const runServer = require('./server');

(async () => {
    const { port, server } = await runServer();
    process.env.PORT = port;
    await require('jest').run('--env=node --no-cache --colors test/e2e/specs --setupFilesAfterEnv ./test/e2e/setup.js --preset jest-puppeteer');
    server.close();
    process.exit();
})();
