require('../../env');

const puppeteer = require('puppeteer');

// puppeteer options
const opts = {
    headless: true,
    slowMo: 0,
    timeout: 10000
};


beforeAll(async () => {
    global.location = `http://localhost:${process.env.PORT}`;
    global.browser = await puppeteer.launch(opts);
    global.page = await browser.newPage();

    /**
     * Returns dom element attribute value selector + attribute name
     * @param selector
     * @param attr
     * @returns {!Promise<!Object|undefined>|Promise<WrapElementHandle<any>>|*}
     */
    global.page.getAttributeOf = function(selector, attr) {
        return global.page.$eval(selector, (el, attribute) => el.getAttribute(attribute), attr);
    };

    page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
    page.on('error', msg => console.log('ERROR LOG:', msg.text()));
    page.on('requestfailed', msg => console.log('REQUEST ERROR LOG:', msg.text()));
    global.takeScreenshotOfPage = (title = 'page') => page.screenshot({ path: 'test/e2e/screenshots/' + title + '.png' });
});


afterAll(() => {
    global.browser.close();
    delete global.page;
    delete global.browser;
    delete global.takeScreenshotOfPage;
});
