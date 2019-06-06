describe('card-separate-brands', () => {
    beforeAll(async () => {
        await page.goto(`${location}/card-separate-brands`);
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

    it('should decline the MasterCard by default', async () => {
        expect(await page.$('#events-number-onReady-true')).not.toEqual(null);

        const btn = await page.$('#card');
        await btn.click();
        await page.keyboard.type('4111 1111 1111 111');

        expect(
            await page.$(
                '#events-number-onChange-error-code-unavailable-card-brand'
            )
        ).not.toEqual(null);
    });

    it('should allow the Visa after update and decline after restore', async () => {
        await page.waitFor(200);

        expect(
            await page.$(
                '#events-number-onChange-error-code-unavailable-card-brand'
            )
        ).not.toEqual(null);
        expect(
            await page.$(
                '#events-number-onChange-error-code-incomplete-card-number'
            )
        ).toEqual(null);

        const btn2 = await page.$('#btn-update');
        await btn2.click();
        await page.waitFor(200);

        expect(
            await page.$(
                '#events-number-onChange-error-code-unavailable-card-brand'
            )
        ).toEqual(null);
        expect(
            await page.$(
                '#events-number-onChange-error-code-incomplete-card-number'
            )
        ).not.toEqual(null);

        const btn3 = await page.$('#btn-restore');
        await btn3.click();
        await page.waitFor(200);

        expect(
            await page.$(
                '#events-number-onChange-error-code-unavailable-card-brand'
            )
        ).not.toEqual(null);
        expect(
            await page.$(
                '#events-number-onChange-error-code-incomplete-card-number'
            )
        ).toEqual(null);
    });
});
