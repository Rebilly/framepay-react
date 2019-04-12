describe('card-separate', () => {
    beforeAll(async () => {
        await page.goto(`${location}/card-separate`);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Card Page Separate Fields'
        );
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
