describe('card-separate', () => {
    beforeAll(async () => {
        await page.goto(`${location}/card-separate`, {
            waitUntil: 'networkidle2'
        });
        await page.waitFor(2000);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Card Page Separate Fields'
        );
    });

    it('should render with correct react version', async () => {
        const version = await page.$eval('#react-version', el => el.innerHTML);

        const pkg = require('../../../package.json');

        if (process.env.REACT_VERSION === 'latest') {
            expect(version).toEqual(pkg.devDependencies.react.slice(1));
        } else {
            expect(version).toEqual(process.env.REACT_VERSION);
        }
        expect(version.length >= 6).toEqual(true);
    });

    it('should inject the card iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should be call the on-ready card element hook', async () => {
        expect(await page.$('#events-number-onReady-true')).not.toEqual(null);
    });

    it('should be call the on-ready cvv element hook', async () => {
        expect(await page.$('#events-cvv-onReady-true')).not.toEqual(null);
    });

    it('should be call the on-ready expiry element hook', async () => {
        expect(await page.$('#events-expiry-onReady-true')).not.toEqual(null);
    });
});
