const pkg = require('../../../package.json');
const expectedVersion =
    Cypress.env('REACT_VERSION') ?? pkg.devDependencies.react.slice(1);

it(`should render with correct react version (${expectedVersion})`, () => {
    cy.visit('/');
    cy.get('#react-version')
        .invoke('text')
        .should(actualVersion => {
            expect(actualVersion.startsWith(expectedVersion)).to.be.true;
        });
});
