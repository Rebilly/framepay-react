describe('bank-separate', () => {
    beforeAll(async () => {
        await page.goto(`${location}/bank-separate`, {
            waitUntil: 'networkidle2'
        });
        await page.waitFor(1000);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch(
            'Test Bank Page Separate Fields'
        );
    });

    it('should render with correct react version', async () => {
        const version = await page.$eval('#react-version', el => el.innerHTML);

        expect(
            process.env.REACT_VERSION &&
                version.startsWith(process.env.REACT_VERSION)
        ).toBe(true);
        expect(version.length >= 6).toEqual(true);
    });

    it('should inject the bank iframe into the page', async () => {
        const bank = await page.$('.rebilly-framepay > iframe');
        expect(bank).not.toEqual(null);
    });

    it('should call the on-ready BankAccountType element hook', async () => {
        expect(
            await page.$('#events-bankAccountType-onReady-true')
        ).not.toEqual(null);
    });

    it('should call the on-ready BankAccountNumber element hook', async () => {
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
