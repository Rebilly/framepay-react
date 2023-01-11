describe('paypal', () => {
    beforeEach(() => {
        cy.visit({ url: '/paypal' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Paypal');
    });

    it('should inject the PayPal iframe into the page', () => {
        cy.get('iframe[title="PayPal"]');
    });
});
