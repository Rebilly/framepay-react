describe('card-separate', () => {
    beforeEach(() => {
        cy.visit({ url: '/card-separate' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Card Page Separate Fields');
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
});
