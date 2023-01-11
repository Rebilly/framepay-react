describe('iban', () => {
    beforeEach(() => {
        cy.visit({ url: '/iban' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test IBAN Field');
    });

    it('should inject the card iframe into the page', () => {
        cy.get('iframe#iban');
    });

    it('should call the on-ready iban element hook', () => {
        cy.get('#events-iban-onReady-true');
    });
});
