describe('bank-separate', () => {
    beforeAll(async () => {
        await page.goto(`${location}/bank-separate`, {
            waitUntil: 'networkidle2'
        });
        await page.waitFor(2000);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Bank Page Separate Fields'
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

    it('should inject the bank iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should call the on-ready BankAccountType element hook', async () => {
        await page.waitFor(2000);
        expect(
            await page.$('#events-bankAccountType-onReady-true')
        ).not.toEqual(null);
    });

    it('should call the on-ready BankAccountNumber element hook', async () => {
        await page.waitFor(2000);
        expect(
            await page.$('#events-bankAccountNumber-onReady-true')
        ).not.toEqual(null);
    });

    it('should call the on-ready BankRoutingNumber element hook', async () => {
        await page.waitFor(2000);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-true')
        ).not.toEqual(null);
    });
});
