// TODO: Add more test cases...
describe('google-pay', () => {
    beforeEach(() => {
        cy.visit({ url: '/google-pay' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Google Pay');
    });
});
