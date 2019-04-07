describe('checkout-combined', () => {
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
        await page.waitFor(100);

        // @ts-ignore
        const isInvalidPaymentCardError = await page.getAttributeOf(
            '#token-data-code-invalid-payment-card',
            'data-value'
        );
        expect(isInvalidPaymentCardError).toEqual('invalid-payment-card');
    });

    it('should handle the error on empty card number', async () => {
        await page.$('#events-onReady');
        const btn = await page.$('#submit');

        await btn.click();

        // wait iframepay validation calls
        await page.waitFor(200);

        // @ts-ignore
        const isInvalidPaymentCardError = await page.getAttributeOf(
            '#token-data-code-invalid-payment-card',
            'data-value'
        );
        expect(isInvalidPaymentCardError).toEqual('invalid-payment-card');
    });
});
