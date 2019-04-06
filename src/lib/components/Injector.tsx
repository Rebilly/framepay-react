import * as React from 'react';
import { ContextConsumer } from '../context';
import BankElementComponent from './elements/BankElement';
import CardElementComponent from './elements/CardElement';

interface WrappedComponentProps {
    readonly framePay: FramePayApi;
}

function Hoc<P extends object>(
    name: string,
    WrappedComponent: React.ComponentType<P>,
    provider: (data: FramePayContext) => object
) {
    return class extends React.Component<WrappedComponentProps & P, {}> {
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
         * Default Bank Element
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-bankaccount-mount
         */
        const BankElement = Hoc(
            'BankElement',
            BankElementComponent,
            (data: FramePayContext): BankElementComponentProps => ({ ...data })
        );

        /**
         * Bank AccountT
         * ype Element
         */
        const BankAccountTypeElement = Hoc(
            'BankAccountTypeElement',
            BankElementComponent,
            (data: FramePayContext): BankElementComponentProps => ({
                ...data,
                elementType: 'bankAccountType'
            })
        );

        /**
         * BankRoutingNumber Element
         */
        const BankRoutingNumberElement = Hoc(
            'BankRoutingNumberElement',
            BankElementComponent,
            (data: FramePayContext): BankElementComponentProps => ({
                ...data,
                elementType: 'bankRoutingNumber'
            })
        );

        /**
         * Bank AccountNumber Element
         */
        const BankAccountNumberElement = Hoc(
            'BankAccountNumberElement',
            BankElementComponent,
            (data: FramePayContext): BankElementComponentProps => ({
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
            'CardElement',
            CardElementComponent,
            (data: FramePayContext): CardElementComponentProps => ({ ...data })
        );

        /**
         * Card CVV Element
         */
        const CardCvvElement = Hoc(
            'CardCvvElement',
            CardElementComponent,
            (data: FramePayContext): CardElementComponentProps => ({
                ...data,
                elementType: 'cardCvv'
            })
        );

        /**
         * Card Expiry Element
         */
        const CardExpiryElement = Hoc(
            'CardExpiryElement',
            CardElementComponent,
            (data: FramePayContext): CardElementComponentProps => ({
                ...data,
                elementType: 'cardExpiry'
            })
        );

        /**
         * Card Number Element
         */
        const CardNumberElement = Hoc(
            'CardNumberElement',
            CardElementComponent,
            (data: FramePayContext): CardElementComponentProps => ({
                ...data,
                elementType: 'cardNumber'
            })
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
    const elements = elementsFabric('card');
    return Hoc('CardComponent', WrappedComponent, (data: any) => ({
        framePay: data.api,
        ...elements
    }));
}

export function withFramePayBankComponent<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const elements = elementsFabric('bankAccount');
    return Hoc('BankComponent', WrappedComponent, (data: any) => ({
        framePay: data.api,
        ...elements
    }));
}
