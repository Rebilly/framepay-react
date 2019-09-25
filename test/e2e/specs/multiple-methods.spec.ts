describe('multiple-methods', () => {
    beforeAll(async () => {
        await page.goto(`${location}/multiple-methods`, {
            waitUntil: 'networkidle2'
        });
        await page.waitFor(400);
    });

    it('should load the page', async () => {
        await expect(page.title()).resolves.toMatch('Test Multiple Methods');
    });

    it('should render with correct react version', async () => {
        const version = await page.$eval('#react-version', el => el.innerHTML);

        const pkg = require('../../../package.json');

        if (process.env.REACT_VERSION === 'latest') {
            expect(version).toEqual(pkg.devDependencies.react.slice(1));
        } else {
            expect(version).toEqual(process.env.REACT_VERSION);
        }
        expect(version.length >= 6).toEqual(true);
    });

    it('should call the on-ready card element hook', async () => {
        expect(await page.$('#events-card-onReady-true')).not.toEqual(null);
    });

    it('should init with payment-card method by default', async () => {
        expect(await page.$('#events-card-onReady-true')).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-false')
        ).not.toEqual(null);
        expect(await page.$('#events-iban-onReady-false')).not.toEqual(null);
    });

    it('should load other methods', async () => {
        expect(await page.$('#events-card-onReady-true')).not.toEqual(null);

        expect(
            await page.$('#events-bankAccountType-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-false')
        ).not.toEqual(null);
        expect(await page.$('#events-iban-onReady-false')).not.toEqual(null);

        const btn = await page.$('#set-active-element-bank');
        await btn.click();

        await page.waitFor(800);

        // disable all elements
        expect(await page.$('#events-card-onReady-false')).not.toEqual(null);
        expect(await page.$('#events-iban-onReady-false')).not.toEqual(null);

        // load new
        expect(
            await page.$('#events-bankAccountNumber-onReady-true')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-true')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-true')
        ).not.toEqual(null);

        // load IBAN
        const btn2 = await page.$('#set-active-element-iban');
        await btn2.click();

        await page.waitFor(800);

        expect(await page.$('#events-iban-onReady-true')).not.toEqual(null);

        expect(await page.$('#events-card-onReady-false')).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-false')
        ).not.toEqual(null);
    });

    it('should generate the card token', async done => {
        const btnMethod = await page.$('#set-active-element-card');
        await btnMethod.click();

        await page.waitFor(500);

        expect(await page.$('#events-card-onReady-true')).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-false')
        ).not.toEqual(null);

        // @ts-ignore
        await page.$eval('#pre', el => (el.style.display = 'none'));

        const frames = page.frames();

        frames.forEach(async frame => {
            const frameName = frame.name();

            if (frameName.includes('card')) {
                // @ts-ignore
                await frame.$eval('form', form => {
                    const cardNumber = '4111111111111111';
                    const expiry =
                        String('0' + (new Date().getMonth() + 1)).substr(-2) +
                        String(new Date().getFullYear()).substr(-2);
                    const cvv = '123';

                    form.querySelector(
                        'input[name="cardnumber"]'
                        // @ts-ignore
                    ).value = cardNumber;

                    form.querySelector(
                        'input[name="exp-date"]'
                        // @ts-ignore
                    ).value = expiry;

                    // @ts-ignore
                    form.querySelector('input[name="cvc"]').value = cvv;
                });

                // @ts-ignore
                const btnSubmit = await page.$('#submit');
                await btnSubmit.click();

                await page.waitFor(3000);

                await page.$eval(
                    '#key-events',
                    // @ts-ignore
                    el => (el.style.display = 'none')
                );

                expect(
                    await page.$('#events-card-onChange-valid-true')
                ).not.toEqual(null);

                expect(
                    await page.$('#events-card-onChange-source-card')
                ).not.toEqual(null);

                expect(await page.$('#token-error-false')).not.toEqual(null);

                expect(
                    await page.$('#token-data-method-payment-card')
                ).not.toEqual(null);
                expect(
                    await page.$('#token-data-paymentInstrument-brand-Visa')
                ).not.toEqual(null);
                done();
            }
        });
    });

    it('should generate the bank token', async done => {
        const btnMethod = await page.$('#set-active-element-bank');
        await btnMethod.click();

        await page.waitFor(500);

        expect(await page.$('#events-card-onReady-false')).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-true')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-true')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-true')
        ).not.toEqual(null);

        // @ts-ignore
        await page.$eval('#pre', el => (el.style.display = 'none'));

        const frames = page.frames();
        // tslint:disable
        let fieldsList = [
            'bankAccountType',
            'bankRoutingNumber',
            'bankAccountNumber'
        ];

        let submitForm = false;

        frames.forEach(async frame => {
            const frameName = frame.name();
            if (frameName.includes('bank')) {
                const fieldName = fieldsList.shift();
                switch (fieldName) {
                    case 'bankAccountType':
                        await frame.$eval('form', form => {
                            // @ts-ignore
                            form.querySelector('[title="Savings"]').click();
                        });
                        break;
                    case 'bankRoutingNumber':
                        await frame.$eval('form', form => {
                            form.querySelector(
                                '[name="bankRoutingNumber"]'
                                // @ts-ignore
                            ).value = '11111111';
                        });
                        break;

                    case 'bankAccountNumber':
                        await frame.$eval('form', form => {
                            form.querySelector(
                                '[name="bankAccountNumber"]'
                                // @ts-ignore
                            ).value = '22222222';
                        });
                        break;
                }
            }
            if (!fieldsList.length && !submitForm) {
                submitForm = true;

                await page.$eval(
                    '#key-events',
                    // @ts-ignore
                    el => (el.style.display = 'none')
                );

                // @ts-ignore
                const btnSubmit = await page.$('#submit');
                await btnSubmit.click();

                await page.waitFor(1500);

                expect(
                    await page.$(
                        '#events-bankAccountNumber-onChange-valid-true'
                    )
                ).not.toEqual(null);

                expect(
                    await page.$(
                        '#events-bankAccountNumber-onChange-source-bankAccountNumber'
                    )
                ).not.toEqual(null);

                expect(
                    await page.$(
                        '#events-bankRoutingNumber-onChange-valid-true'
                    )
                ).not.toEqual(null);

                expect(
                    await page.$(
                        '#events-bankRoutingNumber-onChange-source-bankRoutingNumber'
                    )
                ).not.toEqual(null);

                expect(
                    await page.$('#events-bankAccountType-onChange-valid-true')
                ).not.toEqual(null);

                expect(
                    await page.$(
                        '#events-bankAccountType-onChange-source-bankAccountType'
                    )
                ).not.toEqual(null);

                expect(await page.$('#token-error-false')).not.toEqual(null);

                expect(await page.$('#token-data-method-ach')).not.toEqual(
                    null
                );

                expect(
                    await page.$('#token-data-paymentInstrument-brand-Visa')
                ).not.toEqual(null);

                done();
            }
        });
    });
    it('should generate the iban token', async done => {
        const btnMethod = await page.$('#set-active-element-iban');
        await btnMethod.click();

        await page.waitFor(500);

        expect(await page.$('#events-iban-onReady-true')).not.toEqual(null);

        expect(await page.$('#events-card-onReady-false')).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountType-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankAccountNumber-onReady-false')
        ).not.toEqual(null);
        expect(
            await page.$('#events-bankRoutingNumber-onReady-false')
        ).not.toEqual(null);

        // @ts-ignore
        await page.$eval('#pre', el => (el.style.display = 'none'));

        const frames = page.frames();
        // tslint:disable
        let fieldsList = ['iban'];

        let submitForm = false;

        frames.forEach(async frame => {
            const frameName = frame.name();
            if (frameName.includes('iban')) {
                const fieldName = fieldsList.shift();
                switch (fieldName) {
                    case 'iban':
                        await frame.$eval('form', form => {
                            form.querySelector(
                                '[name="iban"]'
                                // @ts-ignore
                            ).value = 'DE89 3704 0044 0532 0130 00';
                        });
                        break;
                }
            }
            if (!fieldsList.length && !submitForm) {
                submitForm = true;

                await page.$eval(
                    '#key-events',
                    // @ts-ignore
                    el => (el.style.display = 'none')
                );

                // @ts-ignore
                const btnSubmit = await page.$('#submit');
                await btnSubmit.click();

                await page.waitFor(1500);

                expect(
                    await page.$('#events-iban-onChange-valid-true')
                ).not.toEqual(null);

                expect(await page.$('#token-error-false')).not.toEqual(null);

                expect(await page.$('#token-data-method-ach')).not.toEqual(
                    null
                );

                done();
            }
        });
    });
});
