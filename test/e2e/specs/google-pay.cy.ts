describe('google-pay', () => {
    beforeEach(() => {
        cy.visit({ url: '/google-pay' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Google Pay');
    });

    it('should inject the Google pay iframe into the page', () => {
        cy.get('iframe#googlePay');
    });
});
