describe('card-separate-brands', () => {
    beforeEach(() => {
        cy.visit({ url: '/card-separate-brands' });
    });

    it('should load the page', () => {
        cy.title().should(
            'eq',
            'Test Card Page Separate Fields allowed Brands'
        );
    });

    it('should inject the card iframes into the page', () => {
        cy.get('iframe#cardNumber');
        cy.get('iframe#cardCvv');
        cy.get('iframe#cardExpiration');
    });

    it('should be call the on-ready card element hook', () => {
        cy.get('#events-number-onReady-true');
    });

    it('should be call the on-ready cvv element hook', () => {
        cy.get('#events-cvv-onReady-true');
    });

    it('should be call the on-ready expiry element hook', () => {
        cy.get('#events-expiry-onReady-true');
    });

    /*it('should decline the MasterCard by default', async () => {
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
        await page.waitFor(1000);

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
        await page.waitFor(1500);

        expect(
            await page.$(
                '#events-number-onChange-error-code-unavailable-card-brand'
            )
        ).toEqual(null);
        // deprecated
        // expect(
        //     await page.$(
        //         '#events-number-onChange-error-code-incomplete-card-number'
        //     )
        // ).not.toEqual(null);

        const btn3 = await page.$('#btn-restore');
        await btn3.click();
        await page.waitFor(1500);

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
    });*/
});
