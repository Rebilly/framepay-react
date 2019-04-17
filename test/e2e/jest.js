require('../../env');
const runServer = require('./server');

(async () => {
    const { port, server } = await runServer();
    process.env.PORT = port;
    await require('jest').run(process.argv.slice(2).join(' '));
    server.close();
    process.exit();
})();
