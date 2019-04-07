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
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-number-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });

    it('should be call the on-ready cvv element hook', async () => {
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-cvv-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });

    it('should be call the on-ready expiry element hook', async () => {
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-expiry-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });
});
