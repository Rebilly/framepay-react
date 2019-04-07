describe('bank-separate', () => {
    beforeAll(async () => {
        await page.goto(`${location}/bank-separate`);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Bank Page Separate Fields'
        );
    });

    it('should inject the card iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should be call the on-ready card element hook', async () => {
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-bankAccountType-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });

    it('should be call the on-ready cvv element hook', async () => {
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-bankAccountNumber-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });

    it('should be call the on-ready expiry element hook', async () => {
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-bankRoutingNumber-onReady-true',
            'data-value'
        );
        expect(isReady).toEqual('true');
    });
});
