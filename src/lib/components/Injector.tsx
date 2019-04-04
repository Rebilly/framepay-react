import * as React from 'react';
import { ContextConsumer } from '../context';
import BankElementComponent from './elements/BankElement';
import CardElementComponent from './elements/CardElement';

interface WrappedComponentProps {
    readonly framePay: FramePayApi;
    // readonly BankComponent?: BankElement,
    // readonly CardComponent?: CardElement,
}

function Hoc<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    provider: (data: FramePayContext) => object
) {
    return class extends React.Component<WrappedComponentProps & P, {}> {
        static readonly displayName = `FramePayInjector(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {
            return (
                <ContextConsumer>
                    {data => {
                        const providedElements = provider(data);
                        return (
                            <WrappedComponent
                                {...{ ...this.props, ...providedElements }}
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
         * Default Bank Element
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-bankaccount-mount
         */
        const BankElement = Hoc(
            BankElementComponent,
            (data: FramePayContext) => ({ ...data })
        );

        /**
         * Bank AccountT
         * ype Element
         */
        const BankAccountTypeElement = Hoc(
            BankElementComponent,
            (data: FramePayContext) => ({
                ...data,
                elementType: 'bankAccountType'
            })
        );

        /**
         * BankRoutingNumber Element
         */
        const BankRoutingNumberElement = Hoc(
            BankElementComponent,
            (data: FramePayContext) => ({
                ...data,
                elementType: 'bankRoutingNumber'
            })
        );

        /**
         * Bank AccountNumber Element
         */
        const BankAccountNumberElement = Hoc(
            BankElementComponent,
            (data: FramePayContext) => ({
                ...data,
                elementType: 'bankAccountNumber'
            })
        );

        return {
            BankAccountNumberElement,
            BankAccountTypeElement,
            BankElement,
            BankRoutingNumberElement
        };
    }

    if (type === 'card') {
        /**
         * Default Card Element
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-card-mount
         */
        const CardElement = Hoc(
            CardElementComponent,
            (data: FramePayContext) => ({ ...data })
        );

        /**
         * Card CVV Element
         */
        const CardCvvElement = Hoc(
            CardElementComponent,
            (data: FramePayContext) => ({ ...data, elementType: 'cardCvv' })
        );

        /**
         * Card Expiry Element
         */
        const CardExpiryElement = Hoc(
            CardElementComponent,
            (data: FramePayContext) => ({ ...data, elementType: 'cardExpiry' })
        );

        /**
         * Card Number Element
         */
        const CardNumberElement = Hoc(
            CardElementComponent,
            (data: FramePayContext) => ({ ...data, elementType: 'cardNumber' })
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

export function withFramePayCardComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return Hoc(WrappedComponent, (data: any) => ({
        framePay: data.api,
        ...elementsFabric('card')
    }));
}

export function withFramePayBankComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return Hoc(WrappedComponent, (data: any) => ({
        framePay: data.api,
        ...elementsFabric('bankAccount')
    }));
}
