describe('bank-separate', () => {
    beforeEach(() => {
        cy.visit({ url: '/bank-separate' });
    })

    it('should load the page', () => {
        cy.title().should('eq', 'Test Bank Page Separate Fields');
    });

    it('should inject the bank iframes into the page', () => {
        cy.get('iframe#bbanAccountType');
        cy.get('iframe#bbanAccountNumber');
        cy.get('iframe#bbanRoutingNumber');
    });

    it('should call the on-ready BankAccountType element hook', () => {
        cy.get('#events-bankAccountType-onReady-true');
    });

    it('should call the on-ready BankAccountNumber element hook', () => {
        cy.get('#events-bankAccountNumber-onReady-true');
    });

    it('should call the on-ready BankRoutingNumber element hook', () => {
        cy.get('#events-bankRoutingNumber-onReady-true');
    });
});
