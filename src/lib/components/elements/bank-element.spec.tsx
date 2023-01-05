import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { render } from '@testing-library/react';
import * as React from 'react';
import FramePayError from '../../framepay-error';
import BankElement from './bank-element';

describe('BankElement', () => {
    it('should not setup the element while api is not ready', () => {
        const props = Substitute.for<BankProps>();

        const setupElementSpy = jest.spyOn(
            BankElement.prototype,
            'setupElement'
        );

        render(
            <BankElement
                {...props}
                Rebilly={{
                    ...props.Rebilly,
                    bankAccount: props.Rebilly.bankAccount,
                    ready: false
                }}
                elementType="bankRoutingNumber"
            />
        );

        expect(setupElementSpy).not.toHaveBeenCalled();
    });

    it('should setup the element when api is ready', () => {
        const props = Substitute.for<BankProps>();

        const setupElementSpy = jest.spyOn(
            BankElement.prototype,
            'setupElement'
        );

        render(
            <BankElement
                {...props}
                Rebilly={{
                    ...props.Rebilly,
                    bankAccount: props.Rebilly.bankAccount,
                    ready: true
                }}
                elementType="bankAccountType"
            />
        );

        expect(setupElementSpy).toHaveBeenCalled();
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<BankProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

        props.Rebilly.bankAccount.mount(Arg.any(), Arg.any()).returns(element);

        class TmpComponent extends React.Component {
            render() {
                return (
                    <BankElement
                        {...props}
                        Rebilly={{
                            ...props.Rebilly,
                            bankAccount: props.Rebilly.bankAccount,
                            ready: true
                        }}
                        elementType="bankRoutingNumber"
                    />
                );
            }
        }

        const { unmount } = render(<TmpComponent />);
        unmount();
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<BankProps>();

        props.Rebilly.ready.returns(true);

        const { container } = render(
            <BankElement {...props} Rebilly={props.Rebilly} />
        );
        expect(container.firstChild).toMatchInlineSnapshot(`<div />`);
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<BankProps>();

        try {
            render(
                <BankElement
                    {...props}
                    Rebilly={{
                        ...props.Rebilly,
                        bankAccount: {
                            ...props.Rebilly.bankAccount,
                            mount: null
                        },
                        ready: true
                    }}
                    elementType="bankAccountNumber"
                />
            );
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });
});
