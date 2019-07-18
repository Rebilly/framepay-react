describe('iban', () => {
    beforeAll(async () => {
        await page.goto(`${location}/iban`);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch('Test IBAN Field');
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

    it('should call the on-ready iban element hook', async () => {
        expect(await page.$('#events-iban-onReady-true')).not.toEqual(null);
    });
});
