describe('paypal', () => {
    beforeEach(() => {
        cy.visit({ url: '/paypal' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Paypal');
    });
});
