const puppeteer = require('puppeteer');
const runServer = require('./server');

// puppeteer options
const opts = {
    headless: true,
    slowMo: 0,
    timeout: 10000
};

beforeAll(async () => {
    const { port, server } = await runServer();
    global.location = `http://localhost:${port}`;
    global.server = server;
    global.browser = await puppeteer.launch(opts);
    global.page = await browser.newPage();
    page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
    page.on('error', msg => console.log('ERROR LOG:', msg.text()));
    page.on('requestfailed', msg => console.log('REQUEST ERROR LOG:', msg.text()));
    global.takeScreenshotOfPage = async (title = 'page') => await page.screenshot({ path: 'test/e2e/screenshots/' + title + '.png' });
});

afterAll(() => {
    global.server.close();
    global.browser.close();
    delete global.page;
    delete global.browser;
    delete global.takeScreenshotOfPage;
});