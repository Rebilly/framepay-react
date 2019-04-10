import * as React from 'react';
import { ContextConsumer } from '../context';
import BankElementComponent from './elements/BankElement';
import CardElementComponent from './elements/CardElement';

const makeRebillyProps = (data: FramePayContext): RebillyProps =>
    Object.assign(Object.create(data.api || {}), {
        error: data.error,
        ready: data.ready
    });

function Hoc<P extends object>(
    name: string,
    WrappedComponent: React.ComponentType<P>,
    provider: (data: FramePayContext) => object
) {
    return class extends React.Component<P, {}> {
        static readonly displayName = `withFramePay${name}(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {
            return (
                <ContextConsumer>
                    {data => {
                        const provided = provider(data);
                        return (
                            <WrappedComponent
                                {...{ ...this.props, ...provided }}
                            />
                        );
                    }}
                </ContextConsumer>
            );
        }
    };
}

/**
 * Returns the PaymentMethod elements.
 *
 * @param type {string} PaymentElements
 */
const elementsFabric = (type: PaymentElements): object => {
    if (type === 'bankAccount') {
        /**
         * BankAccount
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-bankaccount-mount
         */

        /**
         * Bank AccountType Element
         */
        const BankAccountTypeElement = Hoc(
            'BankAccountTypeElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankAccountType'
                } as BankProps)
        );

        /**
         * BankRoutingNumber Element
         */
        const BankRoutingNumberElement = Hoc(
            'BankRoutingNumberElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankRoutingNumber'
                } as BankProps)
        );

        /**
         * Bank AccountNumber Element
         */
        const BankAccountNumberElement = Hoc(
            'BankAccountNumberElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankAccountNumber'
                } as BankProps)
        );

        return {
            BankAccountNumberElement,
            BankAccountTypeElement,
            BankRoutingNumberElement
        };
    }

    if (type === 'card') {
        /**
         * Default Card Element
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-card-mount
         */
        const CardElement = Hoc(
            'CardElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data)
                } as CardProps)
        );

        /**
         * Card CVV Element
         */
        const CardCvvElement = Hoc(
            'CardCvvElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardCvv'
                } as CardProps)
        );

        /**
         * Card Expiry Element
         */
        const CardExpiryElement = Hoc(
            'CardExpiryElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardExpiry'
                } as CardProps)
        );

        /**
         * Card Number Element
         */
        const CardNumberElement = Hoc(
            'CardNumberElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardNumber'
                } as CardProps)
        );

        return {
            CardCvvElement,
            CardElement,
            CardExpiryElement,
            CardNumberElement
        };
    }

    /**
     * Throw the error by default.
     */
    throw new Error(
        `Invalid PaymentMethod type, see PaymentMethodTypes declaration`
    );
};

export function withFramePay<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return Hoc('EmptyComponent', WrappedComponent, (data: FramePayContext) => ({
        Rebilly: makeRebillyProps(data)
    }));
}

export function withFramePayCardComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const elements = elementsFabric('card');
    return Hoc('CardComponent', WrappedComponent, (data: FramePayContext) => ({
        Rebilly: makeRebillyProps(data),
        ...elements
    }));
}

export function withFramePayBankComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const elements = elementsFabric('bankAccount');
    return Hoc('BankComponent', WrappedComponent, (data: FramePayContext) => ({
        Rebilly: makeRebillyProps(data),
        ...elements
    }));
}
