// TODO: configure to only run on Safari, add more test cases
describe('apple-pay', () => {
    beforeEach(() => {
        cy.visit({ url: '/apple-pay' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Apple Pay');
    });
});
