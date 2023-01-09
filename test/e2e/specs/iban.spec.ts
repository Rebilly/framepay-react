describe('iban', () => {
    beforeAll(async () => {
        await page.goto(`${location}/iban`);
        await page.waitFor(1000);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch('Test IBAN Field');
    });

    it('should render with correct react version', async () => {
        const version = await page.$eval('#react-version', el => el.innerHTML);

        expect(
            process.env.REACT_VERSION &&
                version.startsWith(process.env.REACT_VERSION)
        ).toBe(true);
        expect(version.length >= 6).toEqual(true);
    });

    it('should inject the card iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should call the on-ready iban element hook', async () => {
        await page.waitFor(600);
        expect(await page.$('#events-iban-onReady-true')).not.toEqual(null);
    });
});
