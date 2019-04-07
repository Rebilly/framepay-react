describe('checkout-bank', () => {
    beforeAll(async () => {
        await page.goto(`${location}/checkout-bank`);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Checkout Page Bank Account'
        );
    });

    it('should inject the card iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should be call the on-ready hook', async () => {
        const onReady = await page.$('#events-onReady');
        // @ts-ignore
        const isReady = await page.getAttributeOf(
            '#events-onReady',
            'data-value'
        );

        expect(onReady).not.toEqual(null);
        expect(isReady).toEqual('true');
    });

    it('should call the on-change hook', async () => {
        await page.$('#events-onReady');
        const btn = await page.$('#submit');
        await page.$('#events-onChange');

        await btn.click();

        // wait iframepay validation calls
        await page.waitFor(200);

        // @ts-ignore
        const isInvalidPaymentCardError = await page.getAttributeOf(
            '#token-data-code-invalid-bank-account',
            'data-value'
        );
        expect(isInvalidPaymentCardError).toEqual('invalid-bank-account');
    });

    it('should handle the error on empty value', async () => {
        await page.$('#events-onReady');
        const btn = await page.$('#submit');

        await btn.click();

        // wait iframepay validation calls
        await page.waitFor(200);

        // @ts-ignore
        const isInvalidPaymentCardError = await page.getAttributeOf(
            '#token-data-code-invalid-bank-account',
            'data-value'
        );
        expect(isInvalidPaymentCardError).toEqual('invalid-bank-account');
    });
});
