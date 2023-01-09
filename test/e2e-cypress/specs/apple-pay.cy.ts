// TODO: configure to only run on Safari
describe('apple-pay', () => {
    beforeEach(() => {
        cy.visit({ url: '/apple-pay' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Apple Pay');
    });
});
