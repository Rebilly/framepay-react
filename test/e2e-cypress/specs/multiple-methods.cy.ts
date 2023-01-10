describe('multiple-methods', () => {
    beforeEach(() => {
        cy.visit({ url: '/multiple-methods' });
    });

    it('should load the page', () => {
        cy.title().should('eq', 'Test Multiple Methods');
    });

    it('should call the on-ready card element hook', () => {
        cy.get('#events-card-onReady-true');
    });

    it('should init with payment-card method by default', () => {
        cy.get('#events-card-onReady-true');
        cy.get('#events-bankAccountType-onReady-false');
        cy.get('#events-bankAccountNumber-onReady-false');
        cy.get('#events-bankRoutingNumber-onReady-false');
        cy.get('#events-iban-onReady-false');
    });

    it('should load other methods', () => {
        cy.get('#events-card-onReady-true');

        cy.get('#set-active-element-bank').click();

        // check other methods are disabled
        cy.get('#events-card-onReady-false');
        cy.get('#events-iban-onReady-false');

        // check bank is loaded
        cy.get('#events-bankAccountNumber-onReady-true');
        cy.get('#events-bankAccountType-onReady-true');
        cy.get('#events-bankRoutingNumber-onReady-true');

        // load IBAN
        cy.get('#set-active-element-iban').click();

        // check other methods are disabled
        cy.get('#events-card-onReady-false');
        cy.get('#events-bankAccountType-onReady-false');
        cy.get('#events-bankAccountNumber-onReady-false');
        cy.get('#events-bankRoutingNumber-onReady-false');

        // check IBAN is loaded
        cy.get('#events-iban-onReady-true');

        // load Google Pay
        cy.get('#set-active-element-googlepay').click();

        // check other methods are disabled
        cy.get('#events-card-onReady-false');
        cy.get('#events-bankAccountType-onReady-false');
        cy.get('#events-bankAccountNumber-onReady-false');
        cy.get('#events-bankRoutingNumber-onReady-false');
        cy.get('#events-iban-onReady-false');

        // check Google Pay is loaded
        cy.iframe('#googlePay');
    });

    it('should generate the card token', () => {
        cy.get('#events-card-onReady-true');

        cy.iframe('iframe#card').within(() => {
            const cardNumber = '4111111111111111';
            const expiry =
                String('0' + (new Date().getMonth() + 1)).substr(-2) +
                String(new Date().getFullYear()).substr(-2);
            const cvv = '123';

            cy.findByTestId('cardnumber').type(cardNumber);
            cy.findByTestId('exp-date').type(expiry);
            cy.findByTestId('cvv').type(cvv);
        });

        cy.get('#submit').click();

        cy.get('#events-card-onChange-valid-true');
        cy.get('#events-card-onChange-source-card');
        cy.get('#token-error-false');
        cy.get('#token-data-method-payment-card');
        cy.get('#token-data-paymentInstrument-brand-Visa');
    });

    it('should generate the bank token', () => {
        cy.get('#set-active-element-bank').click();

        cy.get('#events-bankAccountType-onReady-true');
        cy.get('#events-bankAccountNumber-onReady-true');
        cy.get('#events-bankRoutingNumber-onReady-true');

        cy.iframe('iframe#bbanAccountType')
            .findByTestId('savings')
            .click();
        cy.iframe('iframe#bbanAccountNumber')
            .findByTestId('bbanAccountNumber')
            .type('22222222');
        cy.iframe('iframe#bbanRoutingNumber')
            .findByTestId('bbanRoutingNumber')
            .type('11111111');

        cy.get('#submit').click();

        cy.get('#events-bankAccountNumber-onChange-valid-true');
        cy.get('#events-bankAccountNumber-onChange-source-bankAccountNumber');
        cy.get('#events-bankRoutingNumber-onChange-valid-true');
        cy.get('#events-bankRoutingNumber-onChange-source-bankRoutingNumber');
        cy.get('#events-bankAccountType-onChange-valid-true');
        cy.get('#events-bankAccountType-onChange-source-bankAccountType');
        cy.get('#token-error-false');
        cy.get('#token-data-method-ach');
    });

    it('should generate the iban token', () => {
        cy.get('#set-active-element-iban').click();

        cy.get('#events-iban-onReady-true');

        cy.iframe('iframe#iban')
            .findByTestId('iban')
            .type('DE89 3704 0044 0532 0130 00');

        cy.get('#submit').click();

        cy.get('#events-iban-onChange-valid-true');
        cy.get('#token-error-false');
        cy.get('#token-data-method-ach');
    });
});
