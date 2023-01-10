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

    it('should decline the MasterCard by default', () => {
        cy.get('#events-number-onReady-true');

        cy.iframe('iframe#cardNumber')
            .findByTestId('cardnumber')
            .type('4111 1111 1111 1111');

        cy.get('#events-number-onChange-error-code-unavailable-card-brand');
    });

    it('should allow the Visa after update and decline after restore', () => {
        cy.iframe('iframe#cardNumber').findByTestId('cardnumber').type('4111 1111 1111 1111');

        cy.iframe('iframe#cardCvv').findByTestId('cvv').type('123');

        cy.iframe('iframe#cardExpiration').within(() => {
            const expiry =
                String('0' + (new Date().getMonth() + 1)).substr(-2) +
                String(new Date().getFullYear()).substr(-2);
            
            cy.findByTestId('exp-date').type(expiry);
        });

        cy.get('#events-number-onChange-error-code-unavailable-card-brand');

        cy.get('#btn-update').click();

        cy.get(
            '#events-number-onChange-error-code-unavailable-card-brand'
        ).should('not.exist');

        cy.get('#btn-restore').click();

        cy.get('#events-number-onChange-error-code-unavailable-card-brand');
    });
});
