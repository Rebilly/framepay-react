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

    it('should be call the on-ready BankAccountType element hook', async () => {
        expect(
            await page.$('#events-bankAccountType-onReady-true')
        ).not.toEqual(null);
    });

    it('should be call the on-ready BankAccountNumber element hook', async () => {
        expect(
            await page.$('#events-bankAccountNumber-onReady-true')
        ).not.toEqual(null);
    });

    it('should call the on-ready BankRoutingNumber element hook', async () => {
        expect(
            await page.$('#events-bankRoutingNumber-onReady-true')
        ).not.toEqual(null);
    });
});
