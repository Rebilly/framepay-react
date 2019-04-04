describe('GoTest Checkout Page Combined', () => {
    beforeAll(async () => {
        await page.goto(`${location}/checkout-combined`);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Checkout Page Combined Field'
        );
    });

    it('should inject the card iframe into the page', async () => {
        const card = await page.$('.rebilly-framepay > iframe');
        expect(card).not.toEqual(null);
    });
});
