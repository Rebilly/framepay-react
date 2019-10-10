require('../../env');

const puppeteer = require('puppeteer');

// puppeteer options
const headless = true;

const opts = {
    headless,
    slowMo: headless ? 0 : 500,
    timeout: 15000,
    ignoreHTTPSErrors: true,
    args: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-extensions',
        `--window-size=1300,800`
    ]
};

jest.setTimeout(15000);

beforeAll(async () => {
    global.location = `http://localhost:${process.env.PORT}`;
    global.browser = await puppeteer.launch(opts);
    global.page = await browser.newPage();

    page.on('console', msg => console.log('CONSOLE LOG:', msg.text && typeof msg.text === 'function' ? msg.text() : msg.text));
    page.on('error', msg => console.log('ERROR LOG:',  msg.text && typeof msg.text === 'function' ? msg.text() : msg.text));
    page.on('requestfailed', msg => console.log('REQUEST ERROR LOG:',  msg.text && typeof msg.text === 'function' ? msg.text() : msg.text));
    global.takeScreenshotOfPage = (title = 'page') => global.page.screenshot({
        path: 'test/e2e/screenshots/' + title + '.png',
        fullPage: true
    });
});


afterAll(() => {
    global.browser.close();
    delete global.page;
    delete global.browser;
    delete global.takeScreenshotOfPage;
});
