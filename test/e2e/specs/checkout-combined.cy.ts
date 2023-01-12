describe('checkout-combined', () => {
    beforeEach(() => {
        cy.visit({ url: '/checkout-combined' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Checkout Page Combined Field');
    });

    it('should inject the card iframe into the page', () => {
        cy.get('iframe#card');
    });

    it('should be call the on-ready hook', () => {
        cy.get('#events-onReady-true');
    });

    it('should call the on-change hook', () => {
        cy.get('#events-onReady-true');
        cy.get('#submit').click();
        cy.get('#key-onChange');
        cy.get('#token-data-code-invalid-payment-card');
    });
});
